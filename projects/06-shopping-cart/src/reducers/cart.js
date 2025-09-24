export const cartInitialState = JSON.parse(localStorage.getItem('cart')) || []

export const cartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

function updateLocalStorage (cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_TO_CART: {
      const productInCart = state.findIndex(item => item.id === action.payload.id)

      if (productInCart === -1) {
        const newState = [
          ...state,
          {
            ...action.payload,
            quantity: 1
          }
        ]
        updateLocalStorage(newState)
        return newState
      } else {
        const newState = [...state]
        newState[productInCart].quantity += 1
        updateLocalStorage(newState)
        return newState
      }
    }
    case cartActions.REMOVE_FROM_CART: {
      const newState = state.filter(item => item.id !== action.payload.id)
      updateLocalStorage(newState)
      return newState
    }
    case cartActions.CLEAR_CART: {
      window.localStorage.removeItem('cart')
      return []
    }
    default:
      return state
  }
}