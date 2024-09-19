import {  useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import {Circule} from './components/CirculeSection'
import { TURNS, columnas } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import './App.css'
import { BoardGame } from './components/BoardGame'
import { Button } from './components/Button'
import { ResetGameStorage, ResetScoreStorage, SaveGameStorage } from './logic/storage'




function App() {
  const [score, setScore] =useState(() =>{
    const scoreFromStorage = localStorage.getItem('scores')
    return scoreFromStorage ? JSON.parse(scoreFromStorage) : {
    redPlayer: {victorias:0, derrotas:0},
    yellowPlayer: {victorias:0, derrotas:0},
  }
  })
  const [game, setGame] = useState(1)
  

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(42).fill(null)
  })
  
  

  const [empate, setEmpate] = useState(() =>{
    const empatesFromStorage =  parseInt(window.localStorage.getItem('empate'))
    return empatesFromStorage ?? 0
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.R;
  })
  const [winner, setWinner] = useState(null)
  //null, no hay ganador aun, false empate, true ganador

  const handlerScore = (winnerPlayer)  =>{
    
      const newScore = { ...score }
      if(winnerPlayer === TURNS.R){        
        newScore.redPlayer.victorias +=1
        newScore.yellowPlayer.derrotas +=1
        setScore(newScore)
        
      }else{
        newScore.yellowPlayer.victorias +=1
        newScore.redPlayer.derrotas +=1
      }
      window.localStorage.setItem('scores', JSON.stringify(newScore))
  }
 

  
  const checkCol = (indice) =>{
    const array = columnas.find((col) => col.includes(indice))
    return array    
  }
  
  const cleanBoard = () =>{
    setBoard(Array(42).fill(null))
    //setTurn(TURNS.R)
    setWinner(null)
    ResetGameStorage()    


  }

  const resetGame = () =>{
    setBoard(Array(42).fill(null))
    setTurn(TURNS.R)
    setWinner(null)
    ResetGameStorage() 
    setScore( {
      redPlayer: {victorias:0, derrotas:0},
      yellowPlayer: {victorias:0, derrotas:0}
    }
    )
    setEmpate(0)
    ResetScoreStorage()   


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
      handlerScore(newWinner)
      confetti()
      setWinner(newWinner)
      setGame(prevGame => prevGame+1)     

      

    }else if(checkEndGame(newBoard)){
      setWinner(false)// empate  
      const newEmpate = empate+1
      setEmpate(newEmpate)
      window.localStorage.setItem('empate', newEmpate)
      
      

    }
    
    const newTurn = turn === TURNS.R ? TURNS.Y : TURNS.R
    setTurn(newTurn)

    SaveGameStorage({board: newBoard, turn: newTurn})



  }

  useEffect(()=>{
    const newTurn = (game > 1 && game % 2 == 0) ?  TURNS.Y : TURNS.R;
    setTurn(newTurn)   
    
  }, [game])


 
  return (
    <main className='board'>
      <h1>Conecta 4</h1>
        <h2>Score:</h2>        
        <section className='score'>
          <div className='red'>
            <Circule  >{TURNS.R}</Circule>
            <p className='winText'>Victorias:{score.redPlayer.victorias}</p>
            <p className='lostText'>Derrotas:{score.redPlayer.derrotas}</p>


          </div>
          <div className='yellow'>
            <Circule  >{TURNS.Y}</Circule>
              <p className='winText'>Victorias:{score.yellowPlayer.victorias}</p>
              <p className='lostText'>Derrotas:{score.yellowPlayer.derrotas}</p>
          </div>       
        </section>
        <section className='draw'>
          <h2>Empates: {empate}</h2>
        </section>

        <Button functionGame={cleanBoard} className='cleanButton'>Limpiar tablero</Button>
        <Button functionGame={resetGame} className='resetGame'>Reiniciar Juego</Button>
        <BoardGame board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <h2 className='title'>Turn:</h2>
        <Circule  isSelected={turn === TURNS.R}>{TURNS.R}</Circule>
        <Circule  isSelected={turn === TURNS.Y}>{TURNS.Y}</Circule>

      </section>

     <WinnerModal functionGame={cleanBoard} winner={winner} />

    </main>
  )
}

export default App
