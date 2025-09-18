export function saveGameToLocalStorage (board, turn) {
  localStorage.setItem('board', JSON.stringify(board))
  localStorage.setItem('turn', turn)
}

export function clearGameToLocalStorage () {
  localStorage.removeItem('board')
  localStorage.removeItem('turn')
}