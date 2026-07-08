// Mongoose model for a shopping cart.
// Each browser gets its own cartId (saved in localStorage on the frontend),
// so the same visitor keeps their cart between refreshes.
const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Cart", cartSchema)
