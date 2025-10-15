import { type Product, type ProductId, type ProductWithId, addProduct, updateProduct, deleteProductById } from "../store/product/slice"
import { useAppDispatch } from "./store"


export const useProductActions = () => {

  const dispatch = useAppDispatch()

  const addNewProduct = ({ title, price, description, stock }: Product) => {
    dispatch(addProduct({ title, price, description, stock }));
  }

  const editProduct = ({ id, title, price, description, stock }: ProductWithId) => {
    dispatch(updateProduct({ id, title, price, description, stock }));
  }

  const deleteProduct = (id: ProductId) => {
    dispatch(deleteProductById(id));
  }

  return {
    addNewProduct,
    editProduct,
    deleteProduct
  }
}