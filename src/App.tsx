import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from '../frontend/src/components/Sidebar'
import Dashboard from '../frontend/src/components/Dashboard'
import EssayView from '../frontend/src/components/EssayView'
import VoiceNoteInput from '../frontend/src/components/VoiceNoteInput'
import EssayList from '../frontend/src/components/EssayList'
import './App.css'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/essays" element={<EssayList />} />
            <Route path="/essay/:id" element={<EssayView />} />
            <Route path="/voice-note" element={<VoiceNoteInput />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App