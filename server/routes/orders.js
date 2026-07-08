// Routes for orders. Checkout on the frontend POSTs here.
const express = require("express")
const router = express.Router()
const Order = require("../models/Order")

// GET /api/orders  -> list all orders (newest first)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/orders/:id  -> one order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// POST /api/orders  -> place a new order (this is what Checkout calls)
router.post("/", async (req, res) => {
  try {
    const { customerName, items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" })
    }

    // calculate the total on the server so it can't be faked from the client
    let total = 0
    items.forEach((item) => {
      total += item.price * item.qty
    })

    const order = new Order({
      customerName: customerName || "Guest",
      items: items,
      total: total,
    })

    const saved = await order.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/orders/:id  -> update an order (e.g. change status to "preparing")
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: "Order not found" })
    }
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/orders/:id  -> cancel/delete an order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: "Order not found" })
    }
    res.json({ message: "Order deleted", order: deleted })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
