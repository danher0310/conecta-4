// eslint-disable-next-line react/prop-types
export const Button = ({children, functionGame, className})=>{
  const classNames = `button ${className}`
  return(
    <button onClick={functionGame} className={classNames} >{children}</button>
  )
}