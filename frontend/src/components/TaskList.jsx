import { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:8000/tasks',
        { title: newTask, description: '' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Tasks</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCreateTask} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task above!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600">{task.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
