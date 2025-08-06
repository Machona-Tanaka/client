import { user } from '../../../utils/authUtils';
import './css/layout.scss'

const Navbar = () => {
  const userData = user();
  const userInfo = JSON.parse(userData);
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <div className="navbar-left">
        {/* <h1 className="text-lg md:text-xl font-semibold text-gray-800">Admin Dashboard</h1> */}
      </div>

      <div className="navbar-right">
        {userInfo && (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">{userInfo.username}</span>
            <div className="relative w-9 h-9">
              <img
                src={userInfo.avatar || '/default-avatar.png'}
                alt="User"
                className="w-full h-full rounded-full object-cover border border-gray-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.png';
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>

  );
};

export default Navbar;