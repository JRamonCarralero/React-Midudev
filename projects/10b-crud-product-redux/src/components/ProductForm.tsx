import { useEffect, useRef } from "react"
import { useProductActions } from "../hooks/useProductActions"
import type { ProductWithId } from "../store/product/slice"

export const ProductForm = ({ selectedProduct, setSelectedProduct }: 
  { selectedProduct: ProductWithId | null, setSelectedProduct: React.Dispatch<React.SetStateAction<ProductWithId | null>> }
) => {
  const { addNewProduct, editProduct } = useProductActions()

  const formRef = useRef(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const id = formData.get("pid") as string
    const name = formData.get("pname") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const stock = formData.get("stock") as string

    if (!name || !price || !description || !stock) return

    if (id) {
      editProduct({ id, title: name, price: Number(price), description, stock: Number(stock) });
    } else {
      addNewProduct({ title: name, price: Number(price), description, stock: Number(stock) });
    }

    form.reset(); 
    const pidInput = form.elements.namedItem("pid") as HTMLInputElement;
    if (pidInput) {
        pidInput.value = "";
    }

    setSelectedProduct(null)
  }

  useEffect(() => {
    if (!formRef.current) return
    const form = formRef.current as HTMLFormElement

    const pidInput = form.elements.namedItem("pid") as HTMLInputElement;
    const pnameInput = form.elements.namedItem("pname") as HTMLInputElement;
    const priceInput = form.elements.namedItem("price") as HTMLInputElement;
    const descriptionInput = form.elements.namedItem("description") as HTMLInputElement;
    const stockInput = form.elements.namedItem("stock") as HTMLInputElement;

    if (!selectedProduct) {
        form.reset();
        if (pidInput) pidInput.value = "";
        return;
    }
    
    if (pidInput) pidInput.value = selectedProduct.id.toString();
    if (pnameInput) pnameInput.value = selectedProduct.title;
    if (priceInput) priceInput.value = selectedProduct.price.toString();
    if (descriptionInput) descriptionInput.value = selectedProduct.description;
    if (stockInput) stockInput.value = selectedProduct.stock.toString();
  }, [selectedProduct])

  return (
    <form onSubmit={handleSubmit} className="product-form" ref={formRef}>
      <input type="hidden" name="pid" id="pid" />

      <div className="form-container">
        <div className="input-container">
          <label htmlFor="pname">Name</label>
          <input type="text" name="pname" id="pname" />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
        </div>
        <div className="input-container">
          <label htmlFor="stock">Stock</label>
          <input type="number" name="stock" id="stock" />
        </div>
      </div>
    
      <div className="form-button">
        <button type="submit">Save</button>
      </div>
    </form>
  )
}