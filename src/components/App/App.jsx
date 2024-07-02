import { Routes, Route } from 'react-router-dom'

import Auth from '../Auth'

import './App.css'
import HomePage from '../../pages/HomePage'

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<HomePage />} />
      </Routes> */}
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
