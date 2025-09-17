import { createRoot } from 'react-dom/client'
import React from 'react'

// eslint-disable-next-line react-refresh/only-export-components
const Button = ({text}) => {
  return (
    <button>{text}</button>
  )
}

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Button text="button1" />
    <Button text="button2" />
    <Button text="button3" />
  </React.Fragment>
)
