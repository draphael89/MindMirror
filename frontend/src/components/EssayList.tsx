import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Essay {
  id: string
  title: string
  createdAt: string
  tags: string[]
}

function EssayList() {
  const [essays, setEssays] = useState<Essay[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real app, this would be an API call
    const mockEssays: Essay[] = [
      { id: '1', title: 'The Future of AI', createdAt: '2023-04-15', tags: ['technology', 'ai'] },
      { id: '2', title: 'Climate Change Solutions', createdAt: '2023-04-14', tags: ['environment', 'science'] },
      { id: '3', title: 'The Art of Productivity', createdAt: '2023-04-13', tags: ['productivity', 'self-improvement'] },
      { id: '4', title: 'Understanding Quantum Computing', createdAt: '2023-04-12', tags: ['technology', 'science'] },
      { id: '5', title: 'The Impact of Social Media', createdAt: '2023-04-11', tags: ['society', 'technology'] },
    ]
    setEssays(mockEssays)
  }, [])

  const filteredEssays = essays.filter((essay) =>
    essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    essay.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">All Essays</h2>
      <input
        type="text"
        placeholder="Search essays..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredEssays.map((essay) => (
          <li key={essay.id} className="mb-4 p-4 bg-white shadow rounded-lg">
            <Link to={`/essay/${essay.id}`} className="text-xl text-blue-600 hover:text-blue-800">
              {essay.title}
            </Link>
            <p className="text-sm text-gray-500">Created on: {essay.createdAt}</p>
            <div className="mt-2">
              {essay.tags.map((tag) => (
                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EssayList