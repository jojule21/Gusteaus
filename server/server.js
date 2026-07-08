// Gusteau's backend - Node + Express + MongoDB (Mongoose)
// HW4: moved the menu/cart/orders out of the frontend and into a real database.
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// connect to MongoDB (connection string goes in the .env file)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message)
    process.exit(1)
  })

// API routes
app.use("/api/menu", require("./routes/menu"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/cart", require("./routes/cart"))

// quick health check so I can tell if the server is up on Render
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

// in production, serve the built React app from the dist folder
// so the whole site can be hosted as one Render web service
app.use(express.static(path.join(__dirname, "..", "dist")))
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})
