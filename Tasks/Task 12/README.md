# Product Upload API

A small Express and MongoDB API for managing products with image uploads using Multer.

## Features

- Create products with `name`, `description`, `price`, and an image.
- Validate that the uploaded file is an image.
- Limit image uploads to 5 MB.
- Generate unique filenames to avoid collisions.
- Save the image path with the product document in MongoDB.
- Serve uploaded images through the `/uploads` URL.
- List products sorted from newest to oldest.
- Provide a health check endpoint.

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string

## Run the project

1. Install dependencies:

   `npm install`

2. Copy `.env.example` to `.env` and set `MONGO_URI` if your MongoDB connection is different.

3. Start the API:

   `npm start`

The API runs on `http://localhost:3000` by default. Use `npm run dev` for automatic restarts during development.

## API usage

### Health check

Send a `GET` request to `/health` to confirm that the server is running. The response reports an `ok` status.

### Create a product with an image

Send a `POST` request to `/api/products` as `multipart/form-data`. Include text fields named `name`, `description`, and `price`, plus an image file field named `image`. The image must be a supported image MIME type and no larger than 5 MB. The response returns the created product, including its saved image URL.

### List products

Send a `GET` request to `/api/products` to retrieve all products. Results are ordered by creation time, newest first.

### View an uploaded image

Use the image URL returned in the product response, such as `/uploads/<generated-file-name>`, from the running server.

## Project structure

- `server.js`: Express setup, MongoDB connection, static uploads, and error handling.
- `models/Product.js`: Product schema and persisted image path.
- `routes/products.js`: Product endpoints and upload integration.
- `middleware/upload.js`: Multer storage, file filtering, and size limits.
- `uploads/`: Local storage for uploaded images.
