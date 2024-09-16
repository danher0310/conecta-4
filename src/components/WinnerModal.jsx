
import { Circule } from "./Circule"
import { ResetButton } from "./Button"
export function WinnerModal ({winner, resetGame}) {

  if (winner === null) return null
  const winnerText = winner === false ? 'Empate' : 'Gano'
  return(   
      
    <section className='winner'>
      <div className='text'>
        <h2>
          {winnerText } 
        </h2>
          <header className='win'>
            {winner && <Circule>{winner}</Circule>}

          </header>
          <footer>
          <ResetButton resetGame={resetGame}/>
          </footer>
        
      </div>
    </section>

      
    
  )
}