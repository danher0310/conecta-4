
import { Circule } from "./CirculeSection"
// eslint-disable-next-line react/prop-types
export function BoardGame ({board, updateBoard }) {
  return (
    <section className='game'>
        {
          // eslint-disable-next-line react/prop-types
          board.map((_, index) => {
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

