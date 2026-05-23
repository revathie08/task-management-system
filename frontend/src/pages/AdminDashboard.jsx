import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import UserList from '../components/UserList';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (activeTab === 'users') {
      const fetchUsers = async () => {
        try {
          const response = await axiosInstance.get('/api/auth/users', {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUsers(response.data);
        } catch (error) {
          alert('Failed to fetch users.');
        }
      };
      fetchUsers();
    }
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
      {activeTab === 'tasks' && (
        <div className="bg-white p-6 shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
          <p className="text-gray-500">Manage Tasks feature coming next...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;