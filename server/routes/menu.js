// Routes for the menu. The frontend only really needs GET,
// but I added POST/PUT/DELETE too so menu changes can be done
// through the API (and to show all the CRUD operations in the demo video).
const express = require("express")
const router = express.Router()
const MenuItem = require("../models/MenuItem")

// GET /api/menu  -> all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/menu  -> add a new menu item
router.post("/", async (req, res) => {
  try {
    const item = new MenuItem(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/menu/:id  -> update a menu item (like changing a price)
router.put("/:id", async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) {
      return res.status(404).json({ error: "Menu item not found" })
    }
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/menu/:id  -> remove a menu item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: "Menu item not found" })
    }
    res.json({ message: "Deleted", item: deleted })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
