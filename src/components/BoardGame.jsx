
import { Circule } from "./Circule"
export function BoardGame ({board, updateBoard }) {
  return (
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
  )
}