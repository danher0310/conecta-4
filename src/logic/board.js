
import { winnerCombs } from "../constants";

export const checkWinner = (boardTocheck) =>{    
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

export const checkEndGame = (newBoard)=>{
  return newBoard.every((circule) => circule !==null )

}