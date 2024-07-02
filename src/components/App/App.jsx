import Board from '../Board/Board'
import Container from '../Container'
import Sidebar from '../Sidebar/Sidebar'

import './App.css'

function App() {
  return (
    <>
      <Container>
        <Sidebar />
        <Board />
      </Container>
    </>
  )
}

export default App
