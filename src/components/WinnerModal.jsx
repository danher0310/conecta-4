
import { Circule } from "./CirculeSection"
import { Button } from "./Button"
// eslint-disable-next-line react/prop-types
export function WinnerModal ({winner, functionGame}) {

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
          <Button functionGame={functionGame}>Limpiar tablero</Button>
          </footer>
        
      </div>
    </section>

      
    
  )
}