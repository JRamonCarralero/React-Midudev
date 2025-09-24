import './Filters.css'
import { useState, useId } from 'react'

export function Filters ({ onChange}) {
  const [minPrice, setMinPrice] = useState(0)
  // Como los hooks siempre se ejecutan en el mismo orden, podemos usar useId, que genera un id unico para cada hook
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
    onChange(prevState => ({ ...prevState, minPrice: event.target.value }))
  }

  const handleChangeCategory = () => {
    onChange(prevState => ({ ...prevState, category: event.target.value }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio a partir de</label>
        <input id={minPriceFilterId} type='range' name='price' min='0' max='1000' onChange={handleChangeMinPrice} value={minPrice} />
        <span>{minPrice}</span>
      </div>
      <div>
        <label htmlFor='category'>Categoria</label>
        <select id={categoryFilterId} name='category' onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='smartphones'>Smartphones</option>
          <option value='laptops'>Portátiles</option>
          <option value='fragrances'>Colonias</option>
          <option value='skincare'>Cuidado de piel</option>
          <option value='groceries'>Comestibles</option>
          <option value='home-decoration'>Decoración de casa</option>
        </select>
      </div>
    </section>
  )
}