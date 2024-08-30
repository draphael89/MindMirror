import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FocusCards, Card } from './ui/focus-cards'
import LazyImage from './ui/LazyImage'
import { IconChevronRight } from '@tabler/icons-react'

interface Essay {
  id: string
  title: string
  createdAt: string
  tags: string[]
  imageUrl: string
  src: string
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

function EssayCard({ card, index, hovered, setHovered }: { card: Essay; index: number; hovered: number | null; setHovered: React.Dispatch<React.SetStateAction<number | null>> }) {
  return (
    <Card card={{ src: card.imageUrl, title: card.title }} index={index} hovered={hovered} setHovered={setHovered}>
      <motion.div 
        className="flex flex-col h-full justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
      >
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
      </motion.div>
    </Card>
  )
}

function Dashboard() {
  const [recentEssays, setRecentEssays] = useState<Essay[]>([])
  const [totalEssays, setTotalEssays] = useState(0)

  useEffect(() => {
    // In a real app, this would be an API call
    const mockEssays: Essay[] = [
      { id: '1', title: 'The Future of AI', createdAt: '2023-04-15', tags: ['technology', 'ai'], imageUrl: 'https://source.unsplash.com/random/800x600?ai', src: 'https://source.unsplash.com/random/800x600?ai' },
      { id: '2', title: 'Climate Change Solutions', createdAt: '2023-04-14', tags: ['environment', 'science'], imageUrl: 'https://source.unsplash.com/random/800x600?climate', src: 'https://source.unsplash.com/random/800x600?climate' },
      { id: '3', title: 'The Art of Productivity', createdAt: '2023-04-13', tags: ['productivity', 'self-improvement'], imageUrl: 'https://source.unsplash.com/random/800x600?productivity', src: 'https://source.unsplash.com/random/800x600?productivity' },
    ]
    setRecentEssays(mockEssays)
    setTotalEssays(10) // Mock total
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl font-bold mb-5 text-text-light"
      >
        Dashboard
      </motion.h2>
      <motion.div 
        variants={itemVariants}
        className="card p-6 mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-text-light">Summary</h3>
        <motion.p 
          className="text-text-light text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Total Essays Generated: {totalEssays}
        </motion.p>
      </motion.div>
      <motion.div 
        variants={itemVariants}
        className="card p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-text-light">Recent Essays</h3>
          <Link to="/essays" className="text-primary-light hover:text-primary transition-colors duration-200 flex items-center">
            View All <IconChevronRight size={20} />
          </Link>
        </div>
        <AnimatePresence>
          <FocusCards cards={recentEssays}>
            {(card, index, hovered, setHovered) => (
              <Link to={`/essay/${card.id}`} key={card.id}>
                <EssayCard card={card} index={index} hovered={hovered} setHovered={setHovered} />
              </Link>
            )}
          </FocusCards>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard