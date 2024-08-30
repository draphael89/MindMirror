import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FocusCards, Card } from './ui/focus-cards'
import LazyImage from './ui/LazyImage'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

interface Essay {
  id: string
  title: string
  createdAt: string
  tags: string[]
  imageUrl: string
  src: string // Add this line
}

function EssayCard({ card, index, hovered, setHovered }: { card: Essay; index: number; hovered: number | null; setHovered: React.Dispatch<React.SetStateAction<number | null>> }) {
  return (
    <Card card={{ src: card.imageUrl, title: card.title }} index={index} hovered={hovered} setHovered={setHovered}>
      <div className="flex flex-col h-full justify-end">
        <LazyImage src={card.imageUrl} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 p-4 bg-gradient-to-t from-background-dark to-transparent">
          <h3 className="text-xl font-semibold mb-2 text-text-light">{card.title}</h3>
          <p className="text-sm mb-2 text-text-light/70">Created on: {new Date(card.createdAt).toLocaleDateString()}</p>
          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-secondary-light/30 text-xs rounded-full text-text-light">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function EssayList() {
  const [essays, setEssays] = useState<Essay[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const essaysPerPage = 6

  useEffect(() => {
    const fetchEssays = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockEssays: Essay[] = Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Essay ${i + 1}`,
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        tags: ['tag1', 'tag2'],
        imageUrl: `https://source.unsplash.com/random/800x600?essay=${i + 1}`,
        src: `https://source.unsplash.com/random/800x600?essay=${i + 1}` // Add this line
      }))
      setEssays(mockEssays)
      setIsLoading(false)
    }
    fetchEssays()
  }, [])

  const indexOfLastEssay = currentPage * essaysPerPage
  const indexOfFirstEssay = indexOfLastEssay - essaysPerPage
  const currentEssays = essays.slice(indexOfFirstEssay, indexOfLastEssay)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold mb-5 text-text-light">All Essays</h2>
      <div className="card p-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-background-light/30 h-48 rounded-lg mb-2"></div>
                <div className="h-4 bg-background-light/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-background-light/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FocusCards cards={currentEssays}>
                {(card, index, hovered, setHovered) => (
                  <Link to={`/essay/${card.id}`} key={card.id}>
                    <EssayCard card={card} index={index} hovered={hovered} setHovered={setHovered} />
                  </Link>
                )}
              </FocusCards>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-background-light/30 text-text-light disabled:opacity-50 transition-colors duration-200 hover:bg-background-light/50"
            >
              <IconChevronLeft size={20} />
            </button>
            {Array.from({ length: Math.ceil(essays.length / essaysPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                  currentPage === index + 1
                    ? 'bg-primary-light text-background-dark'
                    : 'bg-background-light/30 text-text-light hover:bg-background-light/50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(essays.length / essaysPerPage)}
              className="p-2 rounded-full bg-background-light/30 text-text-light disabled:opacity-50 transition-colors duration-200 hover:bg-background-light/50"
            >
              <IconChevronRight size={20} />
            </button>
          </nav>
        </div>
      </div>
    </motion.div>
  )
}

export default EssayList