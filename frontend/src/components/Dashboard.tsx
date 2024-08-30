import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Essay {
  id: string
  title: string
  createdAt: string
  tags: string[]
}

function Dashboard() {
  const [recentEssays, setRecentEssays] = useState<Essay[]>([])
  const [totalEssays, setTotalEssays] = useState(0)

  useEffect(() => {
    // In a real app, this would be an API call
    const mockEssays: Essay[] = [
      { id: '1', title: 'The Future of AI', createdAt: '2023-04-15', tags: ['technology', 'ai'] },
      { id: '2', title: 'Climate Change Solutions', createdAt: '2023-04-14', tags: ['environment', 'science'] },
      { id: '3', title: 'The Art of Productivity', createdAt: '2023-04-13', tags: ['productivity', 'self-improvement'] },
    ]
    setRecentEssays(mockEssays)
    setTotalEssays(10) // Mock total
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">Dashboard</h2>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <p>Total Essays Generated: {totalEssays}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Essays</h3>
        <ul>
          {recentEssays.map((essay) => (
            <li key={essay.id} className="mb-4">
              <Link to={`/essay/${essay.id}`} className="text-blue-600 hover:text-blue-800">
                {essay.title}
              </Link>
              <p className="text-sm text-gray-500">Created on: {essay.createdAt}</p>
              <div className="mt-1">
                {essay.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard