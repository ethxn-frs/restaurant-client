import React from 'react';
import './ManageItemsPage.css';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import ItemsTable from '../../Components/ItemsTable/ItemsTable';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';

const ManageItemsPage: React.FC = () => {
    return (
        <div className="manage-items-page">
            <AdminHeader />
            <main>
                <ItemsTable />
            </main>
            <AdminFooter />
        </div>
    );
};

export default ManageItemsPage;
