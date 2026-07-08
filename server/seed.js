// One-time seed script: wipes the menuitems collection and
// fills it with the menu from HW1/HW2/HW3.
// Run with:  node server/seed.js
require("dotenv").config()
const mongoose = require("mongoose")
const MenuItem = require("./models/MenuItem")

const menuItems = [
  // Starters
  { section: "Starters", name: "Remy's Herb Soup", description: "Pot of soup with a handful of saffron and herbs", price: 12.0 },
  { section: "Starters", name: "Leek Velouté", description: "Silky leek and potato soup", price: 11.0 },
  { section: "Starters", name: "Mushrooms on Brioche", description: "Wild mushrooms sautéed in butter and thyme, served on toasted brioche", price: 13.0 },
  { section: "Starters", name: "Camembert Crostini", description: "Warm Camembert on baguette with fig jam", price: 14.0 },

  // Main Courses
  { section: "Main Courses", name: "Ratatouille (Confit Byaldi)", description: "Thinly sliced courgette, tomato, and pepper slow-roasted in olive oil", price: 24.0 },
  { section: "Main Courses", name: "Sweetbreads Provençale", description: "Pan-seared veal sweetbreads with herbed jus and roasted garlic", price: 28.0 },
  { section: "Main Courses", name: "Cheese Soufflé", description: "A golden, cloud-light Gruyère soufflé", price: 22.0 },
  { section: "Main Courses", name: "Roasted Chicken with Herbs", description: "Free-range chicken, roasted over thyme and rosemary", price: 26.0 },
  { section: "Main Courses", name: "Linguini's Pasta", description: "Butter-tossed linguine with shallots, white wine, and fresh parsley", price: 20.0 },

  // Desserts
  { section: "Desserts", name: "Crème Brûlée", description: "Vanilla custard with a perfectly torched caramel crust", price: 10.0 },
  { section: "Desserts", name: "Strawberry Tart", description: "Buttery pastry shell, vanilla crème pâtissière, glazed fresh strawberries", price: 11.0 },
  { section: "Desserts", name: "Chocolate Cake", description: "Rich, dense Parisian-style chocolate gâteau", price: 9.0 },

  // Drinks
  { section: "Drinks", name: "Burgundy Red Wine", description: "A glass of Burgundy", price: 13.0 },
  { section: "Drinks", name: "Baguette & Butter", description: "A fresh-baked Parisian baguette with cultured butter", price: 5.0 },
  { section: "Drinks", name: "Café au Lait", description: "Strong French press coffee with steamed whole milk", price: 6.0 },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    await MenuItem.deleteMany({})
    console.log("Cleared old menu items")

    await MenuItem.insertMany(menuItems)
    console.log("Inserted " + menuItems.length + " menu items")

    await mongoose.disconnect()
    console.log("Done!")
  } catch (err) {
    console.error("Seed failed:", err.message)
    process.exit(1)
  }
}

seed()
