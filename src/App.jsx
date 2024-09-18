import {  useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import {Circule} from './components/CirculeSection'
import { TURNS, columnas } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'
import { BoardGame } from './components/BoardGame'
import { ResetButton } from './components/Button'
import { ResetGameStorage, SaveGameStorage } from './logic/storage'



function App() {
  const [game, setGame] = useState(1)
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(42).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.R;
  })
  const [winner, setWinner] = useState(null)
  //null, no hay ganador aun, false empate, true ganador

 

  
  const checkCol = (indice) =>{
    const array = columnas.find((col) => col.includes(indice))
    return array    
  }
  
  const resetGame = () =>{
    setBoard(Array(42).fill(null))
    //setTurn(TURNS.R)
    setWinner(null)
    ResetGameStorage()    


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
      setGame(prevGame => prevGame+1)

      

    }else if(checkEndGame(newBoard)){
      setWinner(false)// empate

    }
    
    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)
    SaveGameStorage({board: newBoard, turn: newTurn})


  }

  useEffect(()=>{
    console.log(game)
    const newTurn = (game > 1 && game % 2 == 0) ?  TURNS.Y : TURNS.R;
    setTurn(newTurn)        
   
    if(winner){
      console.log(winner)
    }else if(winner === false){
      console.log('empate2')
    }
    

    
  }, [game, winner])


 
  return (
    <main className='board'>
      <h1>Conecta 4</h1>
        <ResetButton resetGame={resetGame}/>
        <BoardGame board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <h2 className='title'>Turn:</h2>
        <Circule  isSelected={turn === TURNS.R}>{TURNS.R}</Circule>
        <Circule  isSelected={turn === TURNS.Y}>{TURNS.Y}</Circule>

      </section>

     <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
