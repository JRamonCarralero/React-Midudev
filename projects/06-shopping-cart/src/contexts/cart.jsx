import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    const productInCart = cart.findIndex(item => item.id === product.id)

    if (productInCart === -1) {
      setCart(prevState => {
        return [
          ...prevState,
          {
            ...product,
            quantity: 1
          }
        ]
      })
    } else {
      const newCart = [...cart]
      newCart[productInCart].quantity += 1
      setCart(newCart)
    }
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}