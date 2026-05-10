# Team Task Manager

> A full-stack collaborative project and task management application built with the MERN stack, featuring real-time collaboration, role-based access control, and comprehensive task tracking for teams.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Development Guidelines](#-development-guidelines)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### Authentication & Authorization
- User registration and secure login with JWT tokens
- Password encryption using bcryptjs
- Token-based authentication for protected routes
- Role-based access control (Admin/Member at project level)

### Project Management
- Create and manage multiple projects
- Project-level role assignments
- Team member management within projects
- Project dashboard with overview statistics

### Task Management
- Create, update, and delete tasks within projects
- Task assignment to team members
- Task status tracking
- Task filtering and sorting capabilities
- Due date management

### Dashboard & Analytics
- Personalized user dashboard
- Task overview and activity tracking
- Project statistics and insights

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **Vite** - Next-generation build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **Day.js** - Lightweight date manipulation library
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **Express Validator** - Input validation

## 📁 Project Structure

```
Ethara Ai/
├── frontend/                    # React Vite application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── context/             # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useAuth.js
│   │   ├── layouts/             # Layout components
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── Tasks.jsx
│   │   ├── routes/              # Route protection
│   │   │   └── ProtectedRoute.jsx
│   │   ├── api/                 # API configuration
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                  # Static assets
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # Express API server
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   ├── models/              # MongoDB Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   └── Task.js
│   │   ├── routes/              # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── middleware/          # Express middleware
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   ├── config/
│   │   │   └── db.js            # Database connection
│   │   ├── utils/
│   │   │   └── generateToken.js # JWT token generation
│   │   └── server.js            # Express server entry point
│   └── package.json
│
└── README.md
```

## ✅ Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **MongoDB** database (local or MongoDB Atlas cloud)
- **Git** for version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager
```

### 2. Set Up Backend

```bash
cd backend
npm install
```

### 3. Set Up Frontend

```bash
cd frontend
npm install
```

## 🔐 Environment Variables

### Backend (.env file in `backend/`)

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/team-task-manager
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/team-task-manager?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Frontend (.env file in `frontend/`)

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend Production Server

```bash
cd backend
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user and receive JWT token
- `POST /api/auth/logout` - Logout user

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🌐 Deployment

### Deploy Backend on Railway

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to Railway"
   git push origin main
   ```

2. **Create Railway Project**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository and select `backend` as the root directory

3. **Configure Environment Variables in Railway**
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `CLIENT_URL` - Your frontend domain (e.g., `https://yourdomain.netlify.app`)
   - `NODE_ENV` - Set to `production`

4. **Deploy Service**
   - Railway will automatically deploy when you push to main

### Deploy Frontend on Netlify

1. **Build the Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy on Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set public directory: `dist`
   - Add environment variable: `VITE_API_URL` with your Railway backend URL

3. **Configure Environment Variables**
   - Set `VITE_API_URL` to your backend Railway URL (e.g., `https://your-backend.up.railway.app/api`)

## 💡 Development Guidelines

### Code Structure
- Follow consistent naming conventions (camelCase for variables/functions)
- Keep components small and reusable
- Organize code by feature/functionality
- Use meaningful commit messages

### Best Practices
- Use environment variables for configuration
- Implement proper error handling
- Add input validation on both frontend and backend
- Log important events and errors
- Test your changes before pushing

### Adding New Features

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make your changes and commit: `git commit -m "Add new feature"`
3. Push to GitHub: `git push origin feature/feature-name`
4. Create a Pull Request

## 🔧 Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr "5000" # Windows
```

**MongoDB Connection Error**
- Verify MongoDB is running
- Check `MONGO_URI` in `.env` file
- Ensure MongoDB user credentials are correct

### Frontend Issues

**Vite Command Not Found**
```bash
npm install  # Reinstall dependencies
npm run dev  # Try again
```

**API Calls Returning 404**
- Verify backend is running on correct port
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is properly configured in backend

**CORS Error**
- Check `CLIENT_URL` in backend `.env`
- Verify it matches your frontend URL
- Restart both frontend and backend servers

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** May 10, 2026
