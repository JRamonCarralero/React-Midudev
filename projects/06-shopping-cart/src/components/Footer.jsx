import './Footer.css'

export function Footer ({ filters }) {
  // const { filters } = useFilters()

  return (
    <footer className='footer'>
      {/* <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
      {
        Object.entries(filters).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
          </div>
        ))
      }
    </footer>
  )
}