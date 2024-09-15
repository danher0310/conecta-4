import { Children, useState } from 'react'
import './App.css'

const TURNS = {
  'Y': '🟡',
  'R': '🔴'
}

const columnas = [
  [0,7,14,21,28,35],
  [1,8,15,22,29,36],
  [2,9,16,23,30,37],
  [3,10,17,24,31,38],
  [4,11,18,25,32,39],
  [5,12,19,26,33,40],
  [6,13,20,27,34,41]
]

const winnerCombs = [
  //combinaciones horizontales
  [0,1,2,3],
  [1,2,3,4],
  [2,3,4,5],
  [3,4,5,6],
  [7,8,9,10],
  [8,9,10,11],
  [9,10,11,12],
  [10,11,12,13],
  [14,15,16,17],
  [15,16,17,18],
  [16,17,18,19],
  [17,18,19,20],
  [21,22,23,24],
  [22,23,24,25],
  [23,24,25,26],
  [24,25,26,27],
  [28,29,30,31],
  [29,30,31,32],
  [30,31,32,33],
  [31,32,33,34],
  [35,36,37,38],
  [36,37,38,39],
  [37,38,39,40],
  [38,39,40,41],
  //combinaciones verticales 
  [0,7,14,21],
  [7,14,21,28],
  [14,21,28,35], 
  [1,8,15,22],
  [8,15,22,29],
  [15,22,29,36],
  [2,9,16,23],
  [9,16,23,30],
  [16,23,30,37],
  [3,10,17,24],
  [10,17,24,31],
  [17,24,31,38],
  [4,11,18,25],
  [11,18,25,32],
  [18,25,32,39],
  [5,12,19,26],
  [12,19,26,33],
  [19,26,33,40],
  [6,13,20,27],
  [13,20,27,34],
  [20,27,34,41],
  //combinaciones diagonales
  [0,8,16,23],
  [8,16,24,32],
  [16,24,32,40],
  [1,9,17,25],
  [9,17,25,33],
  [17,25,33,41],
  [2,10,18,26],
  [10,18,26,34],
  [3,11,19,27],
  [7,15,23,31],
  [15,23,31,39],
  [14,22,30,38],
  [3,9,15,21],
  [4,10,16,22],
  [10,16,22,28],
  [5,11,17,23],
  [11,17,23,29],
  [17,23,29,35],
  [6,12,18,24],
  [12,18,24,30],
  [18,24,30,36],
  [13,19,25,31],
  [19,25,31,37],
  [20,26,32,38],
  


]

const Circule = ({ children, isSelected, updateBoard, index}) => {
  //Constante para definir de quien es el turno 
  const className = `circule ${isSelected ? 'is-selected': ''} `
  const handleClick = () =>{
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      
      {children}
    </div>
  )
}



function App() {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.R)
  const [winner, setWinner] = useState(null)
  //null, no hay ganador aun, false empate, true ganador


  const checkWinner = (boardTocheck) =>{    
    for(const combo of winnerCombs){
      // estamos revisando todos los combos ganadores
      const [a, b, c, d] = combo;
      if(
        boardTocheck[a] && boardTocheck[a] === boardTocheck[b] && boardTocheck[b] === boardTocheck[c] && boardTocheck[c] === boardTocheck[d]  
      ){

        return boardTocheck[a]

      }      

    }
    return null
  }
  const checkCol = (indice) =>{
    const array = columnas.find((col) => col.includes(indice))
    return array    
  }
  
  const resetGame = () =>{
    setBoard(Array(42).fill(null))
    setTurn(TURNS.R)
    setWinner(null)

  }

  const checkEndGame = (newBoard)=>{
    return newBoard.every((circule) => circule !==null )

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
      <button onClick={resetGame} >Empezar el juedo de nuevo</button>
      <section className='game'>
        {
          board.map((col, index) => {
            return(
             <Circule 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {/* {index} */}
              {board[index]}
              </Circule>
            )
          })
        }
      </section>
      <section className='turn'>
        <h2>Turn</h2>
        <Circule  isSelected={turn === TURNS.R}>{TURNS.R}</Circule>
        <Circule  isSelected={turn === TURNS.Y}>{TURNS.Y}</Circule>

      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                
                  winner === false ? 'Empate' : 'Ganador'  
                
                } 
                <header className='win'>
                  {winner && <Circule>{winner}</Circule>}

                </header>
                <footer>
                  <button onClick={resetGame} >Jugar otra vez</button>
                </footer>
              </h2>
            </div>
          </section>

        )
      }

    </main>
  )
}

export default App
