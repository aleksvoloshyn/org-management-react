import { Routes, Route } from 'react-router-dom'
import SignUp from './../SignUp'
import Board from '../Board/Board'
import NotFound from '../NotFound'
import Auth from '../Auth'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/*" element={<Auth />} /> */}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  )
}

export default App
