# Gusteau's Restaurant - HW4 (Full Stack)

Extension of my HW3 React app. Added a Node.js + Express + MongoDB backend.
The menu, cart, and orders all live in MongoDB now instead of being hardcoded
in the frontend / localStorage.

## What changed from HW3

- **Menu**: items are stored in a `menuitems` collection in MongoDB. The Menu
  page fetches them with `GET /api/menu` instead of importing `menuData.js`.
- **Cart**: every browser gets a random cartId (kept in localStorage). Every
  add/remove/quantity change is saved to a `carts` collection, so the cart
  survives refreshes and shows up in the DB in real time.
- **Orders**: Checkout asks for your name and `POST`s the order to
  `/api/orders`. Orders are saved with items, total (calculated server-side),
  a status field, and a timestamp.

## API endpoints

| Method | Route | What it does |
|--------|-------|--------------|
| GET | /api/menu | all menu items |
| POST | /api/menu | add a menu item |
| PUT | /api/menu/:id | update a menu item |
| DELETE | /api/menu/:id | delete a menu item |
| GET | /api/orders | all orders |
| POST | /api/orders | place an order (checkout) |
| PUT | /api/orders/:id | update an order (e.g. status) |
| DELETE | /api/orders/:id | delete an order |
| GET | /api/cart/:cartId | load a cart |
| PUT | /api/cart/:cartId | save a cart |
| DELETE | /api/cart/:cartId | clear a cart |

## Running locally

1. Make a free MongoDB Atlas cluster (M0). Create a database user, and under
   Network Access allow `0.0.0.0/0` (needed for Render later anyway).
2. Copy `.env.example` to `.env` and paste in your Atlas connection string.
3. Install and seed:

```
npm install
npm run seed
```

4. Run the backend and frontend in two terminals:

```
npm run server     # Express on http://localhost:5000
npm run dev        # Vite on http://localhost:5173 (proxies /api to 5000)
```

## Deploying to Render (one web service hosts everything)

The Express server serves the built React app from `dist/`, so you only need
ONE Render web service:

1. Push this repo to GitHub.
2. On render.com: New -> Web Service -> connect the repo.
3. Settings:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. Add an environment variable `MONGODB_URI` with your Atlas connection string.
5. Deploy. Then seed the production DB once from your laptop
   (`npm run seed` with the same `MONGODB_URI` in your local `.env`).

Your submission link is the Render URL, e.g. `https://gusteaus.onrender.com`.

## Demo video checklist (CRUD side by side with MongoDB)

Record the browser next to Atlas (Database -> Browse Collections), and hit
the refresh button in Atlas after each action:

- **Create**: add items to the cart (carts collection updates), then checkout
  (a new document appears in orders)
- **Read**: reload the Menu page (items come from menuitems collection)
- **Update**: change a quantity with +/- in the cart (the cart document's
  items array changes), or update a menu price with a PUT request
- **Delete**: Clear Cart (cart document disappears), or DELETE an order

For the PUT/DELETE on menu items you can use Postman or curl, e.g.:

```
curl -X PUT https://YOUR-APP.onrender.com/api/menu/ITEM_ID \
  -H "Content-Type: application/json" -d '{"price": 25.00}'
```
