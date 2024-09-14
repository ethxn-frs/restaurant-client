import React from 'react';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import CategoriesTable from '../../Components/CategoriesTable/CategoriesTable';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';

const ManageCategoriesPage: React.FC = () => {
    return (
        <div className="manage-categories-page">
            <AdminHeader />
            <main>
                <CategoriesTable />
            </main>
            <AdminFooter />
        </div>
    );
};

export default ManageCategoriesPage;
