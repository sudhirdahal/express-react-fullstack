import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">My App</div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
                        Users
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
