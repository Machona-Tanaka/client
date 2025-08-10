import { FaUsers, FaUser, FaUserEdit, FaBackward } from 'react-icons/fa';
import './css/Navigation.scss'; // Link-specific styles
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const NavigationButtons = () => {
    const navigate = useNavigate();
    const reloadPage = (url) => {
        navigate(url);
        window.location.reload();
    };  

    return (
        <div className="user-management-links">
            <button onClick={() => reloadPage("products/new")} className="user-management-link">
                <FaUser className="user-management-link-icon" />
                <span>Create Product</span>
            </button>

            <NavLink to={"products"} className="user-management-link">
                <FaUsers  className="user-management-link-icon" />
                <span>Products Table</span>
            </NavLink>
            <button onClick = {() => navigate(-1)} className="user-management-link">
                <FaBackward className="user-management-link-icon" />
                <span>Back</span>
            </button>
        </div>
    );
}

export default NavigationButtons;