import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate,
      });
    } else {
      setFormData({ title: '', description: '', dueDate: '' });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/tasks', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks([...tasks, response.data]);
      setFormData({ title: '', description: '', dueDate: '' });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h1>
      <input type="text" placeholder="Title" value={formData.title} 
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="w-full mb-4 p-2 border rounded" />
      <input type="text" placeholder="Description" value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className="w-full mb-4 p-2 border rounded" />
      <input type="date" value={formData.dueDate}
        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
        className="w-full mb-4 p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;