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
  const [winnerRed, setWinnerRed] = useState(() => {
    const winnerRedFromStorage = parseInt(window.localStorage.getItem('winnerRed'))
    return winnerRedFromStorage ?? 0
  })
  const [winnerYellow, setWinnerYellow] = useState(() => {
    const winnerYellowFromStorage = parseInt(window.localStorage.getItem('winnerYellow'))
    return winnerYellowFromStorage ?? 0
  })
  
  const [lostRed, setLostRed] = useState(() => {
    const lostRedFromStorage = parseInt(window.localStorage.getItem('lostRed'))
    return lostRedFromStorage ?? 0
  })
  const [lostYellow, setLostYellow] = useState(() => {
    const lostYellowFromStorage = parseInt(window.localStorage.getItem('lostYellow'))
    return lostYellowFromStorage ?? 0
  })
  const [empate, setEmpate] = useState(0)

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
      if(newWinner === TURNS.R){
        setWinnerRed(prevWinnerRed => prevWinnerRed+1)
        setLostYellow(prevLostYellow => prevLostYellow+1)
        // console.log(`aqui ${newVictoryRed}`)
        // window.localStorage.setItem('winnerRed', winnerRed )
        // window.localStorage.setItem('lostYellow', newLostYellow)   



      }
      else{
       setWinnerYellow(prevWinnerYellow => prevWinnerYellow+1)      
        setLostRed(prevLostRed => prevLostRed+1)
        // window.localStorage.setItem('winnerYellow', newVictoryYellow)
        // window.localStorage.setItem('lostRed', newRedYellow)
      }
      console.log(newWinner)
      confetti()
      setWinner(newWinner)
      setGame(prevGame => prevGame+1)

      

    }else if(checkEndGame(newBoard)){
      setWinner(false)// empate
      const newDraft = setEmpate(prevEmpate => prevEmpate+1)
      window.localStorage.setItem('empate', newDraft)

    }
    
    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)
    SaveGameStorage({board: newBoard, turn: newTurn})



  }

  useEffect(()=>{
    const newTurn = (game > 1 && game % 2 == 0) ?  TURNS.Y : TURNS.R;
    setTurn(newTurn) 
    if(winner){
      console.log(winnerRed)
    }     
      

    
  }, [game, winner])


 
  return (
    <main className='board'>
      <h1>Conecta 4</h1>
        <h2>Score:</h2>        
        <section className='score'>
          <div className='red'>
            <Circule  >{TURNS.R}</Circule>
            <p className='winText'>Victorias:{winnerRed}</p>
            <p className='lostText'>Derrotas:{lostRed}</p>


          </div>
          <div className='yellow'>
            <Circule  >{TURNS.Y}</Circule>
              <p className='winText'>Victorias:{winnerYellow}</p>
              <p className='lostText'>Derrotas:{lostYellow}</p>
          </div>       
        </section>
        <section className='draw'>
          <h2>Empates: {empate}</h2>
        </section>

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
