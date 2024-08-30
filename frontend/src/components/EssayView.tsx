import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IconCalendar, IconTag, IconArrowLeft } from '@tabler/icons-react'
import LazyImage from './ui/LazyImage'

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

function EssayView() {
  const { id } = useParams<{ id: string }>()
  const [essay, setEssay] = useState<Essay | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEssay = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockEssay: Essay = {
        id: id || '1',
        title: 'The Future of AI',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        createdAt: '2023-04-15',
        tags: ['technology', 'ai'],
        imageUrl: 'https://source.unsplash.com/random/1200x400?ai'
      }
      setEssay(mockEssay)
      setIsLoading(false)
    }

    fetchEssay()
  }, [id])

  if (isLoading) {
    return (
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-64 bg-background-light/30 rounded-lg mb-4"></div>
        <div className="h-8 bg-background-light/30 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-background-light/30 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-background-light/30 rounded w-full mb-2"></div>
        <div className="h-4 bg-background-light/30 rounded w-full mb-2"></div>
        <div className="h-4 bg-background-light/30 rounded w-3/4"></div>
      </motion.div>
    )
  }

  if (!essay) {
    return (
      <motion.div 
        className="text-center mt-8 text-text-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Essay not found
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants}>
        <Link
          to="/essays"
          className="inline-flex items-center text-primary-light hover:text-primary mb-4 transition-colors duration-200"
        >
          <IconArrowLeft size={20} className="mr-1" />
          Back to Essays
        </Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="relative h-64 sm:h-80 md:h-96 mb-6 rounded-lg overflow-hidden shadow-neon"
      >
        <LazyImage src={essay.imageUrl} alt={essay.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent flex items-end">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light p-6">{essay.title}</h1>
        </div>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="card p-6"
      >
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center text-text-light/70 mb-2 sm:mb-0">
            <IconCalendar size={20} className="mr-2" />
            <p className="text-sm">Created on: {new Date(essay.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-secondary-light/30 text-text-light text-sm font-semibold rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconTag size={16} className="mr-1" />
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="prose prose-lg max-w-none text-text-light">
          {essay.content.split('\n').map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default EssayView