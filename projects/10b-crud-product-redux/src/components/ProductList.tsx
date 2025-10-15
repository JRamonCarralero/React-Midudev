import { useAppSelector } from "../hooks/store"
import { useProductActions } from "../hooks/useProductActions"
import type { ProductWithId } from "../store/product/slice"

export const ProductList = ({ editSelectedProduct }: { editSelectedProduct: (product: ProductWithId) => void }) => {
  const products = useAppSelector(state => state.products)
  const { deleteProduct } = useProductActions()
  
  return (
    <table id="product-table" className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripcion</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: ProductWithId) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
            <td>{product.stock}</td>
            <td>
              <button className="table-btn" onClick={() => editSelectedProduct(product)}>✎</button>
              <button className="table-btn" onClick={() => deleteProduct(product.id)}>🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}