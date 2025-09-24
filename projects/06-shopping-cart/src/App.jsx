import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products'
import { useState } from 'react'
import { IS_DEVELOPMENT } from './config'
import { useFilters } from './hooks/useFilters'

function App() {
  const [products] = useState(initialProducts)
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />} {/* Solo se muestra en modo desarrollo */}
    </>
  )
}

export default App
