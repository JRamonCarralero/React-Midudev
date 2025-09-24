import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState, cartActions } from "../reducers/cart";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

function useCardReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => dispatch({ type: cartActions.ADD_TO_CART, payload: product })
  const removeFromCart = (product) => dispatch({ type: cartActions.REMOVE_FROM_CART, payload: product })
  const clearCart = () => dispatch({ type: cartActions.CLEAR_CART })

  return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCardReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}