# task-manager-app

A full-stack task management application with FastAPI backend and React frontend featuring JWT authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, read, and delete tasks
- **RESTful API**: Clean and organized FastAPI backend
- **Modern Frontend**: React with React Router and Axios
- **Database**: SQLite with SQLAlchemy ORM
- **Security**: Password hashing and token-based authentication

## 📦 Project Structure

```
task-manager-app/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── auth.py           # Authentication functions
│   ├── models.py         # Database models
│   ├── schemas.py        # Pydantic schemas
│   ├── database.py       # Database configuration
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── package.json      # Node dependencies
│   ├── vite.config.js    # Vite configuration
│   └── eslint.config.js  # ESLint configuration
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **python-jose** - JWT token handling
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## 🚦 Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔑 API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and get JWT token
- `GET /profile` - Get user profile (protected)

### Tasks
- `POST /tasks` - Create a new task (protected)
- `GET /tasks` - Get all user tasks (protected)
- `DELETE /tasks/{task_id}` - Delete a task (protected)

## 📝 Environment Variables

You can configure the following in `backend/auth.py`:
- `SECRET_KEY` - JWT secret key
- `ALGORITHM` - JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_HOURS` - Token expiration time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Harshith Pabbi

---

**Note**: This is a learning project for understanding full-stack development with FastAPI and React.
