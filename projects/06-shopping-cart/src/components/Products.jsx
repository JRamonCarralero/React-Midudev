import './Products.css'
import { AddToCartIcon } from './Icons'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div className='product-info'>
              <strong>{product.title}</strong>
              <p>${product.price}</p>
            </div>
            <button>
              <AddToCartIcon />
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}