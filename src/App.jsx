import {  useState } from 'react'
import confetti from 'canvas-confetti'
import Circule from './components/Circule'
import { TURNS, columnas } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'
import { BoardGame } from './components/BoardGame'
import { ResetButton } from './components/Button'



function App() {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.R)
  const [winner, setWinner] = useState(null)
  //null, no hay ganador aun, false empate, true ganador


  
  const checkCol = (indice) =>{
    const array = columnas.find((col) => col.includes(indice))
    return array    
  }
  
  const resetGame = () =>{
    setBoard(Array(42).fill(null))
    setTurn(TURNS.R)
    setWinner(null)

  }

 
  
  const updateBoard = (index) =>{    
    // actualizar el tablero 
    
    const newBoard = [...board]
    // validar en que columna esta el indice
    let col = checkCol(index) 
    // validar en que posicion dela columan ira la pieza
    for(let i = col.length -1; i>=0; i--){
      if(newBoard[col[i]] === null && !winner ){
        newBoard[col[i]] = turn 
        break   
      }// check the winner todo 
    }     
    
    
    
    //newBoard[index] = turn       
    setBoard(newBoard)
    //revisar posibles ganardres
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)

    }else if(checkEndGame(newBoard)){
      setWinner(false)// empate

    }
    
    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)


  }


 
  return (
    <main className='board'>
      <h1>Conecta 4</h1>
        <ResetButton resetGame={resetGame}/>
        <BoardGame board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <h2>Turn</h2>
        <Circule  isSelected={turn === TURNS.R}>{TURNS.R}</Circule>
        <Circule  isSelected={turn === TURNS.Y}>{TURNS.Y}</Circule>

      </section>

     <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
