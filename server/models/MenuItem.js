// Mongoose model for one menu item.
// "section" is which part of the menu it belongs to (Starters, Main Courses, etc.)
const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  section: { type: String, required: true },
})

module.exports = mongoose.model("MenuItem", menuItemSchema)
