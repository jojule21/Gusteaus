import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Cart from './components/Cart.jsx'

import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'

import { getCartId, fetchCart, saveCart, clearCartOnServer, placeOrder } from './api.js'

function App() {
  // the cart now lives in MongoDB - each browser has its own cartId
  const [cartItems, setCartItems] = useState([])

  // whether the cart panel is open
  const [cartOpen, setCartOpen] = useState(false)

  // don't save the cart back to the server until we've loaded it once,
  // otherwise the empty starting cart would overwrite the saved one
  const loaded = useRef(false)

  const cartId = getCartId()

  // load this browser's cart from the database on startup
  useEffect(() => {
    fetchCart(cartId)
      .then((cart) => {
        setCartItems(cart.items || [])
        loaded.current = true
      })
      .catch(() => {
        // if the server is down just start with an empty cart
        loaded.current = true
      })
  }, [])

  // save the cart to the database whenever it changes
  useEffect(() => {
    if (loaded.current) {
      saveCart(cartId, cartItems)
    }
  }, [cartItems])

  // add an item (or bump its quantity if it is already in the cart)
  function addToCart(name, price) {
    let found = false
    const newCart = cartItems.map((item) => {
      if (item.name === name) {
        found = true
        return { ...item, qty: item.qty + 1 }
      }
      return item
    })
    if (!found) {
      newCart.push({ name: name, price: price, qty: 1 })
    }
    setCartItems(newCart)
    setCartOpen(true)
  }

  // change the quantity by +1 or -1; remove the item if it hits 0
  function changeQty(name, delta) {
    const newCart = []
    cartItems.forEach((item) => {
      if (item.name === name) {
        const newQty = item.qty + delta
        if (newQty > 0) {
          newCart.push({ ...item, qty: newQty })
        }
      } else {
        newCart.push(item)
      }
    })
    setCartItems(newCart)
  }

  // remove one item completely
  function removeFromCart(name) {
    setCartItems(cartItems.filter((item) => item.name !== name))
  }

  // empty the cart (locally and in the database)
  function clearCart() {
    setCartItems([])
    clearCartOnServer(cartId)
  }

  // checkout: ask for a name, send the order to the backend,
  // then clear the cart once the order is saved
  async function checkout() {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }
    const name = prompt("Name for the order:")
    if (name === null) {
      return // they hit cancel
    }
    try {
      const order = await placeOrder(name || "Guest", cartItems)
      alert("Thank you! Your order has been placed.\nOrder #" + order._id)
      setCartItems([])
      clearCartOnServer(cartId)
      setCartOpen(false)
    } catch (err) {
      alert("Sorry, something went wrong placing your order. Please try again.")
    }
  }

  // total number of items, for the badge in the navbar
  let cartCount = 0
  cartItems.forEach((item) => {
    cartCount += item.qty
  })

  return (
    <div>
      <Header />
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      <Cart
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
