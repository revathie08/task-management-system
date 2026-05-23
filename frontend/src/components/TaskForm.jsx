import { useState } from 'react';

const TaskForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
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
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;