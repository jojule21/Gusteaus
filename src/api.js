// Small helper for talking to the backend.
// In dev, Vite proxies /api to localhost:5000 (see vite.config.js).
// In production the Express server serves the frontend, so relative /api just works.
const API_BASE = "/api"

// each browser gets a random cart id saved in localStorage,
// so the backend knows which cart document belongs to this visitor
export function getCartId() {
  let id = localStorage.getItem("gusteauCartId")
  if (!id) {
    id = "cart_" + Date.now() + "_" + Math.floor(Math.random() * 100000)
    localStorage.setItem("gusteauCartId", id)
  }
  return id
}

export async function fetchMenu() {
  const res = await fetch(API_BASE + "/menu")
  if (!res.ok) {
    throw new Error("Failed to load menu")
  }
  return res.json()
}

export async function fetchCart(cartId) {
  const res = await fetch(API_BASE + "/cart/" + cartId)
  if (!res.ok) {
    throw new Error("Failed to load cart")
  }
  return res.json()
}

export async function saveCart(cartId, items) {
  const res = await fetch(API_BASE + "/cart/" + cartId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: items }),
  })
  return res.json()
}

export async function clearCartOnServer(cartId) {
  const res = await fetch(API_BASE + "/cart/" + cartId, {
    method: "DELETE",
  })
  return res.json()
}

export async function placeOrder(customerName, items) {
  const res = await fetch(API_BASE + "/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerName: customerName, items: items }),
  })
  if (!res.ok) {
    throw new Error("Failed to place order")
  }
  return res.json()
}
