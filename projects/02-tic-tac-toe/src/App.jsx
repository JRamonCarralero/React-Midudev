import { useState } from "react"
import confetti from 'canvas-confetti'

import { WinnerModal } from "./components/WinnerModal"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { Board } from "./components/Board"
import { Turn } from "./components/Turn"
import { saveGameToLocalStorage, clearGameToLocalStorage } from "./logic/storage"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToLocalStorage(newBoard, newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    clearGameToLocalStorage()
  }

  return (
    <main className="board">
      <h1>tic-tac-toe</h1>
      <button onClick={resetGame}>Restart</button>

      <Board board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
    
  )
}

export default App
