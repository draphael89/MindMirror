import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { transcribeAudio, generateEssay } from '../services/openai'
import LazyImage from './ui/LazyImage'
import { IconMicrophone, IconPlayerStop } from '@tabler/icons-react'

interface Essay {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
  imageUrl: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
}

function VoiceNoteInput() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [essay, setEssay] = useState<Essay | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioData, setAudioData] = useState<number[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRecordingTime(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRecording])

  useEffect(() => {
    if (isRecording) {
      const updateAudioData = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteTimeDomainData(dataArray)
          setAudioData(Array.from(dataArray))
        }
        requestAnimationFrame(updateAudioData)
      }
      updateAudioData()
    }
  }, [isRecording])

  const handleRecordToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    } else {
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = async () => {
        setIsProcessing(true)
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const transcribedText = await transcribeAudio(audioBlob)
        setTranscription(transcribedText)
        const generatedEssayContent = await generateEssay(`Generate a short essay based on the following transcription: ${transcribedText}`)
        
        const imageKeyword = transcribedText.split(' ').slice(0, 3).join('-')
        const imageUrl = `https://source.unsplash.com/random/800x600?${imageKeyword}`

        const newEssay: Essay = {
          id: Date.now().toString(),
          title: transcribedText.split('.')[0],
          content: generatedEssayContent,
          createdAt: new Date().toISOString(),
          tags: ['voice-note', 'ai-generated'],
          imageUrl: imageUrl
        }
        setEssay(newEssay)
        setIsProcessing(false)
      }
      mediaRecorder.start()
      setIsRecording(true)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-5 text-text-light">New Voice Note</motion.h2>
      <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 rounded-full text-background-dark font-semibold ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-light hover:bg-primary'
          } transition duration-300 ease-in-out flex items-center justify-center`}
          onClick={handleRecordToggle}
          disabled={isProcessing}
        >
          {isRecording ? <IconPlayerStop size={32} /> : <IconMicrophone size={32} />}
        </motion.button>
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 text-center"
            >
              <span className="text-text-light text-lg font-semibold">{recordingTime}s</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div 
          className="w-full h-24 mt-4"
          variants={itemVariants}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={`M 0,50 ${audioData.map((d, i) => `L ${i / audioData.length * 100},${d / 255 * 100}`).join(' ')}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-light"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-5 text-text-light flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-t-2 border-primary-light rounded-full mr-2"
            />
            Processing your voice note...
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {transcription && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-2 text-text-light">Transcription:</h3>
            <p className="card p-4">{transcription}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {essay && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-2 text-text-light">Generated Essay:</motion.h3>
            <motion.div variants={itemVariants} className="card p-6">
              <LazyImage src={essay.imageUrl} alt={essay.title} className="w-full h-48 object-cover rounded mb-4" />
              <h4 className="text-2xl font-semibold mb-2 text-text-light">{essay.title}</h4>
              <p className="text-sm text-text-light/70 mb-2">Created on: {new Date(essay.createdAt).toLocaleDateString()}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {essay.tags.map((tag) => (
                  <motion.span 
                    key={tag} 
                    className="px-2 py-1 bg-secondary-light/30 text-text-light text-xs rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.div 
                className="prose prose-lg text-text-light"
                variants={itemVariants}
              >
                {essay.content}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VoiceNoteInput