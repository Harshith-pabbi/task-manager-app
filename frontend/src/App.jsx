import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
              {token && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/tasks" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/tasks" /> : <Register setToken={setToken} />}
          />
          <Route
            path="/tasks"
            element={token ? <TaskList token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={token ? "/tasks" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
