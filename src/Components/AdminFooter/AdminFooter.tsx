import React from 'react';
import './AdminFooter.css';

const AdminFooter: React.FC = () => {
    return (
        <footer className="admin-footer">
            <div className="admin-footer-container">
                <p>&copy; {new Date().getFullYear()} Admin Panel. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default AdminFooter;
