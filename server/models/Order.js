// Mongoose model for a placed order.
// items is a copy of what was in the cart at checkout time.
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "placed" }, // placed -> preparing -> done
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Order", orderSchema)
