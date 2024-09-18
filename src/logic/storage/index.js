export const SaveGameStorage = ({board, turn}) => {
  
    // save game
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  
}
export const ResetGameStorage = () =>{
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}