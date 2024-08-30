import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Essay {
  id: string
  title: string
  content: string
  createdAt: string
  tags: string[]
}

function EssayView() {
  const { id } = useParams<{ id: string }>()
  const [essay, setEssay] = useState<Essay | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchEssay = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockEssay: Essay = {
        id: id || '1',
        title: 'The Future of AI',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        createdAt: '2023-04-15',
        tags: ['technology', 'ai']
      }
      setEssay(mockEssay)
      setIsLoading(false)
    }

    fetchEssay()
  }, [id])

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (!essay) {
    return <div className="text-center mt-8">Essay not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{essay.title}</h2>
      <p className="text-sm text-gray-500 mb-4">Created on: {essay.createdAt}</p>
      <div className="mb-4">
        {essay.tags.map((tag) => (
          <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {tag}
          </span>
        ))}
      </div>
      <div className="prose prose-lg">{essay.content}</div>
    </div>
  )
}

export default EssayView