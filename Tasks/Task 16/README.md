# Restaurant Authentication API

This project is the authentication module for a restaurant application. It supports account registration, login, password hashing, JWT access tokens, and one protected route that returns the current user.

## User Roles

- `customer`: the default role for people who browse the menu, place orders, and make reservations.
- `admin`: reserved for restaurant staff who can be given management permissions in a future module.

Public signup always creates a `customer`. This prevents a visitor from giving themselves admin access. Admin accounts should be created through a protected admin workflow or directly by a trusted database administrator.

## Technologies

- Node.js and Express
- MongoDB with Mongoose
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT access tokens

## Project Structure

```text
config/db.js                 MongoDB connection
controllers/authController.js Signup and login logic
middleware/auth.js           JWT verification middleware
models/User.js               User schema and password hashing
routes/authRoutes.js         Authentication endpoints
routes/userRoutes.js         Protected user endpoints
server.js                    Express application entry point
```

## Run Locally

Prerequisites: Node.js, npm, and a running MongoDB instance (local or MongoDB Atlas).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your values:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/restaurant_auth
   JWT_SECRET=use-a-long-random-secret
   JWT_EXPIRES_IN=7d
   ```

3. Start the API:

   ```bash
   npm start
   ```

   For development with automatic restart:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:3000` by default.

## Routes

### `POST /api/auth/signup`

Creates a customer account and returns a JWT.

Request:

```json
{
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "password": "secret123",
  "phone": "+201001234567"
}
```

Successful response (`201`):

```json
{
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Sara Ahmed",
    "email": "sara@example.com",
    "role": "customer",
    "phone": "+201001234567"
  }
}
```

### `POST /api/auth/login`

Authenticates an existing user.

Request:

```json
{
  "email": "sara@example.com",
  "password": "secret123"
}
```

Wrong credentials return `401` with `Invalid email or password`.

### `GET /api/users/me`

Protected route that returns the logged-in user. In Postman, add this header using the token returned by signup or login:

```text
Authorization: Bearer <your-jwt-token>
```

Missing, invalid, or expired tokens return `401`.

## Postman Test Checklist

1. Send signup with a new email and save the returned `token`.
2. Send login with the correct password and confirm a token is returned.
3. Send login with an incorrect password and confirm the response status is `401`.
4. Call `GET /api/users/me` with `Authorization: Bearer <token>` and confirm the user is returned.
5. Remove or change the token and confirm the protected route returns `401`.

## Security Notes

- Passwords are hashed with bcrypt before they are stored and are never returned in API responses.
- JWT signing uses `JWT_SECRET`; use a long random value outside development.
- Signup does not accept a client-provided role, so customers cannot register themselves as admins.
- User photos and role-specific authorization can be added later without changing the authentication contract.