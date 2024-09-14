import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreateCategoryForm from '../../Components/CreateCategoryForm/CreateCategoryForm';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import './CreateCategoryPage.css'

const CreateCategoryPage: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Category created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/categories');
                    });
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to create category.');
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
                console.error('Error creating category:', error);
            });
    };

    return (
        <div className="create-category-page">
            <AdminHeader />
            <main>
                <CreateCategoryForm onSubmit={handleSubmit} />
            </main>
            <AdminFooter />
        </div>
    );
};

export default CreateCategoryPage;