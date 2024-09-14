import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditCategoryForm from '../../Components/EditCategoryForm/EditCategoryForm';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import './EditCategoryPage.css';

const EditCategoryPage: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        fetch(`${API_URL}/categories/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Category updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/categories');
                    });
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to update category.');
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error updating category:', error);
            });
    };

    return (
        <div className="edit-category-page">
            <AdminHeader />
            <main>
                <div className="edit-category-container">
                    <EditCategoryForm onSubmit={handleSubmit} />
                </div>
            </main>
            <AdminFooter />
        </div>
    );
};

export default EditCategoryPage;