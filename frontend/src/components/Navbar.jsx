import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="text-white p-4 flex justify-between items-center" 
     style={{background: 'linear-gradient(to right, #21A5B4, #0E484E)'}}>
      <Link to="/" className="text-2xl font-bold">Task Management System</Link>
      <div>
      {user ? (
        <>
          {user.role === 'admin' ? (
            <Link to="/admin-dashboard" className="mr-4">Admin Dashboard</Link>
          ) : (
            <>
              <Link to="/tasks" className="mr-4">My Tasks</Link>
              <Link to="/profile" className="mr-4">Profile</Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="mr-4">Login</Link>
          <Link
            to="/register"
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </Link>
        </>
      )}
    </div>  
    </nav>
  );
};

export default Navbar;
