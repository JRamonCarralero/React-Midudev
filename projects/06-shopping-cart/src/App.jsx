import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products'
import { useContext, useState } from 'react'
import { IS_DEVELOPMENT } from './config'
import { FiltersContext } from './contexts/filters'

function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
      )
    })
  }

  return { filters, setFilters, filterProducts }
}

function App() {
  const [products] = useState(initialProducts)
  const { filters, setFilters, filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters} />} {/* Solo se muestra en modo desarrollo */}
    </>
  )
}

export default App
