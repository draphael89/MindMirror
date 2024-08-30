import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">MindMirror</h1>
        <ul>
          <li className="mb-2">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="/essays" className="text-blue-600 hover:text-blue-800">All Essays</Link>
          </li>
          <li className="mb-2">
            <Link to="/voice-note" className="text-blue-600 hover:text-blue-800">New Voice Note</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar