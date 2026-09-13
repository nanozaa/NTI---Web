# Authentication Module

A modular authentication API for a graduation project. It uses Express, MongoDB with Mongoose, bcryptjs password hashing, and JSON Web Tokens (JWT).

## User Roles

- `user`: the default role for public registrations.
- `admin`: supported by the model for future administrator provisioning. Public signup cannot create an admin account.

Each user has a name, unique email, hashed password, role, optional phone number, and timestamps.

## Features

- Register a user and receive a JWT.
- Log in with email and password and receive a JWT.
- Protect private routes with a Bearer token.
- Never return the stored password in API responses.
- Validate duplicate emails and invalid credentials.

## Routes

### `GET /`

Health check.

### `POST /api/auth/signup`

Register a user.

Request body:

```json
{
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "password": "secret123",
  "phone": "+201000000000"
}
```

Response `201`:

```json
{
  "message": "User registered successfully",
  "token": "<jwt-token>",
  "user": {
    "id": "<user-id>",
    "name": "Sara Ahmed",
    "email": "sara@example.com",
    "role": "user",
    "phone": "+201000000000"
  }
}
```

### `POST /api/auth/login`

Authenticate an existing user.

Request body:

```json
{
  "email": "sara@example.com",
  "password": "secret123"
}
```

Wrong credentials return `401` with `Invalid email or password`.

### `GET /api/users/profile`

Protected example route. Send the token from signup or login in the request header:

```text
Authorization: Bearer <jwt-token>
```

A missing, invalid, or expired token returns `401`.

## Local Setup

### Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB Atlas connection string

### Install and configure

```bash
npm install
copy .env.example .env
```

Edit `.env` and set a strong `JWT_SECRET`. Update `MONGO_URI` if you are using MongoDB Atlas.

### Run

```bash
npm run dev
```

The API runs at `http://localhost:3000` by default. Use `npm start` for a normal Node process.

### Postman test sequence

1. Send `POST /api/auth/signup` with the registration JSON and copy the returned `token`.
2. Send `POST /api/auth/login` with the correct credentials and confirm a token is returned.
3. Repeat login with an incorrect password and confirm the `401` response.
4. Send `GET /api/users/profile` with `Authorization: Bearer <token>` and confirm the user profile is returned.
5. Remove or change the token and confirm the protected route returns `401`.

## Project Structure

```text
src/
  config/db.js
  controllers/authController.js
  middleware/auth.js
  models/User.js
  routes/authRoutes.js
  routes/userRoutes.js
  server.js
```
