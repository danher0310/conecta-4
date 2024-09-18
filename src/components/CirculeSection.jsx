/* eslint-disable react/prop-types */

export const Circule = ({ children, isSelected, updateBoard, index}) => {
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
