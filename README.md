# Blog Website

Full-stack blogging app: React (Vite + Tailwind) frontend, Node/Express/MongoDB backend, 6 Google GPT test ad placements.

## Structure

- `backend/` — Express API (auth, users, posts)
- `frontend/` — React app (public blog + admin panel)

## Setup

### Backend

```
cd backend
npm install
# .env already has PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN — see .env.example for the shape
npm run dev
```

Runs on `http://localhost:3000`.

### Frontend

```
cd frontend
npm install
# .env already points VITE_API_BASE_URL at the local backend
npm run dev
```

Runs on `http://localhost:5173`.

## Making the first Admin user

There's no signup flow for admins — register a normal account via the app, then promote it directly in MongoDB:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "Admin" } })
```

## API

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/posts`, `GET /api/posts/:slug` (public)
- `GET /api/posts/admin`, `POST /api/posts`, `PATCH /api/posts/:id`, `DELETE /api/posts/:id` (Admin only)
- `GET /api/users`, `POST /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id`, `DELETE /api/users/:id` (Admin only)

