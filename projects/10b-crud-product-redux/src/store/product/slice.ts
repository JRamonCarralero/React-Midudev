import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ProductId = string;

export interface Product { 
  title: string,
  price: number,
  description: string,
  stock: number
};

export interface ProductWithId extends Product {
  id: ProductId
}

const DEFAULT_STATE: ProductWithId[] = [
  {
    id: "1",
    title: "Product 1",
    price: 100,
    description: "Product 1 description",
    stock: 10
  },
  {
    id: "2",
    title: "Product 2",
    price: 200,
    description: "Product 2 description",
    stock: 20
  },
  {
    id: "3",
    title: "Product 3",
    price: 300,
    description: "Product 3 description",
    stock: 30
  }
];

const initialState: ProductWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).products : DEFAULT_STATE;
})();

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const id = crypto.randomUUID();
      state.push({ id, ...action.payload });
    },
    deleteProductById: (state, action: PayloadAction<ProductId>) => {
      const id = action.payload;
      return state.filter((product) => product.id !== id);
    },
    rollbackProduct: (state, action: PayloadAction<ProductWithId>) => {
      const isProductAlreadyDefined = state.some(product => product.id === action.payload.id);
      if (!isProductAlreadyDefined) {
        state.push(action.payload);
      }
    },
    updateProduct: (state, action: PayloadAction<ProductWithId>) => {
      const id = action.payload.id;
      return state.map((product) => product.id === id ? action.payload : product);
    }
  }
});

export default productSlice.reducer;

export const { addProduct, deleteProductById, rollbackProduct, updateProduct } = productSlice.actions;
