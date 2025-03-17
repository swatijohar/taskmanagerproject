import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { CheckSquare } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import type { Task, CreateTaskInput } from './types/task';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (input: CreateTaskInput) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, input);
      setTasks([response.data, ...tasks]);
      toast.success('Task created successfully');
    } catch (error: any) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;

      const response = await axios.patch(`${API_URL}/tasks/${id}`, {
        completed: !task.completed
      });
      
      setTasks(tasks.map(task =>
        task._id === id ? response.data : task
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleEdit = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
      setTasks(tasks.map(task =>
        task._id === id ? response.data : task
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <CheckSquare className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Task Manager</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900">Add New Task</h2>
                        <div className="mt-4">
                          <TaskForm onSubmit={handleCreateTask} loading={loading} />
                        </div>
                      </div>
                    </div>

                    {loading ? (
                      <div className="text-center">
                        <p className="text-gray-500">Loading tasks...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tasks.map(task => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;