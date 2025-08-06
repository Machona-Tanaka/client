import { NavLink } from 'react-router-dom';
import { user, logout }  from '../../../utils/authUtils';

import { 
  FaTachometerAlt, 
  FaNewspaper, 
  FaPodcast, 
  FaBook,
  FaTshirt,
  FaComment,
  FaUsers,
  FaChartLine,
  FaCog,
  FaUserEdit,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  // const userData = localStorage.getItem('userData');
  // const userId = userData.id;
  const userData = user();
  const user2 = JSON.parse(userData);

  return (
    <>
      <nav className="sidebar-nav">
        <NavLink to="dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <FaTachometerAlt /><span>Dashboard</span>
        </NavLink>
        <NavLink to="articles" className={({ isActive }) => isActive ? "active" : ""}>
          <FaNewspaper /><span>Articles</span>
        </NavLink>
        <NavLink to="podcasts" className={({ isActive }) => isActive ? "active" : ""}>
          <FaPodcast /><span>Podcasts</span>
        </NavLink>
        <NavLink to="guides" className={({ isActive }) => isActive ? "active" : ""}>
          <FaBook /><span>Guides</span>
        </NavLink>
        <NavLink to="products" className={({ isActive }) => isActive ? "active" : ""}>
          <FaTshirt /><span>Products</span>
        </NavLink>
        <NavLink to="comments" className={({ isActive }) => isActive ? "active" : ""}>
          <FaComment /><span>Comments</span>
        </NavLink>
        <NavLink to="users" className={({ isActive }) => isActive ? "active" : ""}>
          <FaUsers /><span>Users</span>
        </NavLink>
        <NavLink to="analytics" className={({ isActive }) => isActive ? "active" : ""}>
          <FaChartLine /><span>Analytics</span>
        </NavLink>
        <NavLink to={`/admin/user/change/password/${user2.id}`} className={({ isActive }) => isActive ? "active" : ""}>
          <FaUserEdit /><span>Change Password</span>
        </NavLink>
        <NavLink to="settings" className={({ isActive }) => isActive ? "active" : ""}>
          <FaCog /><span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        {user && (
          <button onClick={logout} className="logout-btn">
            <FaSignOutAlt /><span>Logout</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;