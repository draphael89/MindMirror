import { useState, useRef } from 'react'
import { transcribeAudio, generateEssay } from '../services/openai'

function VoiceNoteInput() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [essay, setEssay] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const handleRecordToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
    } else {
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }
      mediaRecorder.onstop = async () => {
        setIsProcessing(true)
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const transcribedText = await transcribeAudio(audioBlob)
        setTranscription(transcribedText)
        const generatedEssay = await generateEssay(`Generate a short essay based on the following transcription: ${transcribedText}`)
        setEssay(generatedEssay)
        setIsProcessing(false)
      }
      mediaRecorder.start()
    }
    setIsRecording(!isRecording)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-5">New Voice Note</h2>
      <div className="mb-8">
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-300 ease-in-out`}
          onClick={handleRecordToggle}
          disabled={isProcessing}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {isRecording && (
          <span className="ml-4 inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </div>
      {isProcessing && (
        <div className="mb-5">Processing your voice note...</div>
      )}
      {transcription && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Transcription:</h3>
          <p className="bg-gray-100 p-4 rounded">{transcription}</p>
        </div>
      )}
      {essay && (
        <div>
          <h3 className="text-xl font-bold mb-2">Generated Essay:</h3>
          <div className="prose prose-lg bg-white p-6 rounded shadow">{essay}</div>
        </div>
      )}
    </div>
  )
}

export default VoiceNoteInput