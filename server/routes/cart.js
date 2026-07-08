// Routes for the cart. The cart used to live only in localStorage;
// now every cart change also gets saved to MongoDB so it persists.
const express = require("express")
const router = express.Router()
const Cart = require("../models/Cart")

// GET /api/cart/:cartId  -> load this browser's cart
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId })
    if (!cart) {
      // no cart yet is fine, just return an empty one
      return res.json({ cartId: req.params.cartId, items: [] })
    }
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/cart/:cartId  -> save the whole cart (upsert = create if it doesn't exist)
router.put("/:cartId", async (req, res) => {
  try {
    const updated = await Cart.findOneAndUpdate(
      { cartId: req.params.cartId },
      { items: req.body.items, updatedAt: Date.now() },
      { new: true, upsert: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/cart/:cartId  -> clear the cart (used by Clear Cart and after checkout)
router.delete("/:cartId", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ cartId: req.params.cartId })
    res.json({ message: "Cart cleared" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
