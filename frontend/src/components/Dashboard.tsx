import { useState, useEffect, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FocusCards } from './ui/focus-cards'
import { IconChevronRight } from '@tabler/icons-react'

interface Essay {
  id: string
  title: string
  createdAt: string
  tags: string[]
  imageUrl: string
  src: string
  content: ReactNode
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

function Dashboard() {
  const [recentEssays, setRecentEssays] = useState<Essay[]>([])
  const [totalEssays, setTotalEssays] = useState(0)

  useEffect(() => {
    // In a real app, this would be an API call
    const mockEssays: Essay[] = [
      {
        id: '1',
        title: 'The Future of AI',
        createdAt: '2023-04-15',
        tags: ['technology', 'ai'],
        imageUrl: 'https://source.unsplash.com/random/800x600?ai',
        src: 'https://source.unsplash.com/random/800x600?ai',
        content: <p>AI content</p>
      },
      {
        id: '2',
        title: 'Climate Change Solutions',
        createdAt: '2023-04-14',
        tags: ['environment', 'science'],
        imageUrl: 'https://source.unsplash.com/random/800x600?climate',
        src: 'https://source.unsplash.com/random/800x600?climate',
        content: <p>Climate content</p>
      },
      {
        id: '3',
        title: 'The Art of Productivity',
        createdAt: '2023-04-13',
        tags: ['productivity', 'self-improvement'],
        imageUrl: 'https://source.unsplash.com/random/800x600?productivity',
        src: 'https://source.unsplash.com/random/800x600?productivity',
        content: <p>Productivity content</p>
      }
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
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h3>Summary</h3>
        <motion.p
          className="text-text-light text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Total Essays Generated: {totalEssays}
        </motion.p>
      </motion.div>
      <motion.div variants={itemVariants} className="card p-6">
        <h3 className="text-xl font-bold mb-4">Recent Essays</h3>
        <FocusCards
          cards={recentEssays.map((essay) => ({
            title: essay.title,
            src: essay.src,
            content: (
              <>
                <h3 className="text-xl font-bold mb-2">{essay.title}</h3>
                <p>Created on: {new Date(essay.createdAt).toLocaleDateString()}</p>
                <ul>
                  {essay.tags.map((tag) => (
                    <li key={tag} className="inline-block mr-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold">{tag}</span>
                    </li>
                  ))}
                </ul>
              </>
            )
          }))}
        />
        <Link
          to="/essays"
          className="mt-6 inline-flex items-center text-blue-500 hover:underline"
        >
          View All <IconChevronRight className="ml-1" />
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard