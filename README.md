# Mohsin_Innovaxel_Iqbal

## Project Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or remote instance)

### Backend Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   DBURL=mongodb://localhost:27017/shortenURL
   ```
4. Start the backend server:
   ```sh
   npm run dev
   # or
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

---

## Tech Stack Used

### Backend

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- cors
- unique-slug

### Frontend

- React
- Vite
- Tailwind CSS
- Axios

---

## Backend Files Overview

### `index.js`

- Main entry point for the backend server.
- Sets up Express, CORS, JSON parsing, and environment variables.
- Connects to MongoDB using `connectDB.js`.
- Defines RESTful endpoints for URL shortening, retrieval, update, deletion, and stats.
- Starts the server on the specified `PORT`.

#### Endpoints

- `GET /` — Health check, returns server status.
- `POST /shorten` — Create a new short URL. Body: `{ url: "<original_url>" }`
- `GET /shorten/:id` — Retrieve the original URL by short code.
- `PUT /shorten/:id` — Update the original URL for a given short code. Body: `{ url: "<new_url>" }`
- `DELETE /shorten/:id` — Delete a short URL by short code.
- `GET /shorten/stats/:id` — Get stats (including access count) for a short code.

### `connectDB.js`

- Handles MongoDB connection using Mongoose.
- Reads the `DBURL` from environment variables.
- Logs connection status or errors.

### `urlSchema.js`

- Defines the Mongoose schema for storing URLs.
- Fields:
  - `url`: Original URL (String, required)
  - `shortCode`: Unique short code (String, required, unique)
  - `createdAt`: Timestamp (Date, default: now)
  - `updatedAt`: Timestamp (Date, default: now)
  - `accessCount`: Number of times the short URL was accessed (Number, default: 0)
- Exports the Mongoose model `Url`.

---

## Environmental Variables Required

- `PORT` — Port for backend server (default: 5000)
- `DBURL` — MongoDB connection string (e.g., `mongodb://localhost:27017/shortenURL`)

---

## Notes

- Make sure MongoDB is running before starting the backend server.
- The backend and frontend can be run independently.
- All API endpoints are prefixed from the backend root (e.g., `http://localhost:5000/shorten`).
