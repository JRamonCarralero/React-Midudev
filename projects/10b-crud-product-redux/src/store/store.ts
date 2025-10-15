import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { productSlice } from './product/slice'

const persistanceLocalStorage: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    products: productSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorage)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch