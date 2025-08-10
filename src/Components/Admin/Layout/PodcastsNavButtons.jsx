import { FaUsers, FaUser, FaUserEdit, FaBackward } from 'react-icons/fa';
import './css/Navigation.scss'; // Link-specific styles
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const NavigationButtons = () => {
    const navigate = useNavigate();

    return (
        <div className="user-management-links">
            <NavLink to="podcasts/new" className="user-management-link">
                <FaUser className="user-management-link-icon" />
                <span>Create Podcast</span>
            </NavLink>

            <NavLink to={"podcasts"} className="user-management-link">
                <FaUsers  className="user-management-link-icon" />
                <span>Podcasts Table</span>
            </NavLink>
            <a onClick = {() => navigate(-1)} className="user-management-link">
                <FaBackward className="user-management-link-icon" />
                <span>Back</span>
            </a>
        </div>
    );
}

export default NavigationButtons;