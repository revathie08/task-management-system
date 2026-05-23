import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <p className="text-gray-600">Admin features (View Users, Manage Tasks, Update Status) will be added in upcoming sprints.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;