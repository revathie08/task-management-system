import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import UserList from '../components/UserList';
import AdminTaskList from '../components/AdminTaskList';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'users') {
          const response = await axiosInstance.get('/api/auth/users', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUsers(response.data);
        } else if (activeTab === 'tasks') {
          const response = await axiosInstance.get('/api/tasks/all', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setTasks(response.data);
        }
      } catch (error) {
        alert('Failed to fetch data.');
      }
    };
    fetchData();
  }, [activeTab, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${
            activeTab === 'users' 
              ? 'bg-teal-700 text-white' 
              : 'bg-white text-teal-700 border border-teal-700'
          }`}
        >
          View Users
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded ${
            activeTab === 'tasks' 
              ? 'bg-teal-700 text-white' 
              : 'bg-white text-teal-700 border border-teal-700'
          }`}
        >
          Manage Tasks
        </button>
      </div>

      {activeTab === 'users' && <UserList users={users} />}
      {activeTab === 'tasks' && <AdminTaskList tasks={tasks} />}
    </div>
  );
};

export default AdminDashboard;