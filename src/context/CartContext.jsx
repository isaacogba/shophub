import { createContext, useContext, useState } from "react"
import { getProductById } from "../data/product"

const CartContext = createContext(null)

export default function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]) // cart starts empty — example: { id: 2, quantity: 7 }

  function addToCart(productId) {

    const existing = cartItems.find((item) => item.id === productId) // check if product already in cart

    if (existing) { // product already in cart — increase quantity by 1

      const currentQuantity = existing.quantity // get current quantity

      const updatedCartItems = cartItems.map((item) => // loop through all items
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 } // this item — increase quantity
          : item // other items — leave unchanged
      )

      setCartItems(updatedCartItems) // update cart with new quantities

    } else { // product not in cart — add it with quantity 1

      setCartItems([...cartItems, { id: productId, quantity: 1 }]) // keep existing items + add new one

    }
  }
  function getCartItemsWithProducts() {
    return cartItems.map((item) => ({
        ...item,
        product: getProductById(item.id)
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId){
   setCartItems(cartItems.filter((item)=> item.id !== productId))
  }


  function updateQuantity(productId, quantity){
   if(quantity <= 0){
    removeFromCart(productId);
    return;
   }
   setCartItems(
    cartItems.map((item) =>
        item.id === productId ? {...item, quantity} : item
    )
   )
  }
function getCartTotal(){
    const total = cartItems.reduce((total, item) =>{
        const product = getProductById(item.id);
        return total + (product ? product.price * item.quantity : 0)
    } , 0);
    return total;
  }
  
function clearCart(){
    setCartItems([])
}

  return (
 <CartContext.Provider value={{ cartItems,
  addToCart,
    getCartItemsWithProducts,
    removeFromCart, 
    updateQuantity,
    getCartTotal,
    clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext) // grab values from cart context
  return context
}