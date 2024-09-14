import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import { logout } from '../../Utils/auth';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard-page">
            <AdminHeader />
            <main className="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <div className="admin-links">
                    <Link to="/admin/categories" className="admin-link">Manage Categories</Link>
                    <Link to="/admin/items" className="admin-link">Manage Items</Link>
                    <Link to="/admin/restaurant" className="admin-link">Manage Restaurant</Link>
                    <Link to="/admin/users" className="admin-link">Manage Accounts</Link>
                    <Link to={`/admin/users/edit/${user.id}`} className="admin-link">Manage My Account</Link>
                    <button style={{ border: 'none' }} onClick={handleLogout} className="admin-link logout-button">
                        Log Out
                    </button>
                </div>
            </main>
            <AdminFooter />
        </div>
    );
};

export default AdminDashboard;