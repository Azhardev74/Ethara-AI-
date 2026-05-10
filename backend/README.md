# Team Task Manager Backend

Node.js + Express + MongoDB backend for Team Task Manager.

## Setup

1. Install dependencies:
   - `npm install`
2. Configure `.env`:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_secret`
   - `CLIENT_URL=http://localhost:5173`
3. Run development server:
   - `npm run dev`

## API Base URL

- `http://localhost:5000/api`

## Main Endpoints

- Auth: `/auth/signup`, `/auth/login`, `/auth/me`
- Projects: `/projects`, `/projects/:id`, `/projects/:id/members`
- Tasks: `/tasks`, `/tasks/project/:projectId`, `/tasks/dashboard/summary`
