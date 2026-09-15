# Restaurant MenuItem Module

This is the first backend module for a restaurant graduation project. It manages menu items because a restaurant needs a reliable way to add, view, update, and remove dishes and drinks before customer ordering and authentication are added later.

## Entity

The `MenuItem` entity contains:

- `name`: menu item name
- `description`: short description
- `category`: `appetizer`, `main-course`, `dessert`, or `beverage`
- `price`: item price
- `available`: whether the item can currently be ordered
- `ingredients`: list of ingredients
- `imageUrl`: optional image URL
- `createdAt` and `updatedAt`: added automatically by Mongoose

## Routes

All routes use the `/menuItem` base path.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/menuItem` | Create a menu item |
| GET | `/menuItem` | Get all menu items |
| GET | `/menuItem/:id` | Get one menu item |
| PATCH | `/menuItem/:id` | Update a menu item |
| DELETE | `/menuItem/:id` | Delete a menu item |
| GET | `/health` | Check that the API is running |

## Run locally

1. Install Node.js and MongoDB.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and adjust `MONGO_URI` if needed.
4. Start MongoDB.
5. Start the server:

   ```bash
   npm start
   ```

For development with automatic restart:

```bash
npm run dev
```

The API runs at `http://localhost:3000` by default.

## Example request body

```json
{
  "name": "Margherita Pizza",
  "description": "Tomato, mozzarella, and fresh basil",
  "category": "main-course",
  "price": 180,
  "available": true,
  "ingredients": ["tomato", "mozzarella", "basil"],
  "imageUrl": "https://example.com/margherita-pizza.jpg"
}
```

## Postman

Import `postman/restaurant-menu-module.postman_collection.json` into Postman. Run the requests in order and save screenshots of each request and response in your submission folder.
