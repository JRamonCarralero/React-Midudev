import { useState } from 'react'
import './App.css'
import { ProductForm } from './components/ProductForm'
import { ProductList } from './components/ProductList'
import { type ProductWithId } from './store/product/slice'

function App() {
  const [selproduct, setSelProduct] = useState<ProductWithId | null>(null)

  return (
    <>
      <ProductForm selectedProduct={selproduct} setSelectedProduct={setSelProduct} />
      <ProductList editSelectedProduct={setSelProduct} />
    </>
  )
}

export default App
