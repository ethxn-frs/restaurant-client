import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import { logout } from '../../Utils/auth';

const AdminHeader: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="admin-header">
            <div className="admin-header-container">
                <h1 className="admin-header-title">Admin Panel</h1>
                <nav className="admin-nav">
                    <ul className="admin-nav-list">
                        <li className="admin-nav-item">
                            <Link to="/admin/home" className="admin-nav-link">Dashboard</Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link to="/admin/categories" className="admin-nav-link">Categories</Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link to="/admin/items" className="admin-nav-link">Items</Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link to="/admin/restaurant" className="admin-nav-link">Restaurant</Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link to="/admin/users" className="admin-nav-link">Accounts</Link>
                        </li>
                        <li className="admin-nav-item">
                            <Link to={`/admin/users/edit/${user.id}`} className="admin-nav-link">My Account</Link>
                        </li>
                        <li className="admin-nav-item">
                            <button onClick={handleLogout} className="admin-nav-link logout-button">
                                Log Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;