import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CreateItemForm from '../../Components/CreateItemForm/CreateItemForm';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import './CreateItemPage.css'

const CreateItemPage: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        fetch(`${API_URL}/items`, {
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
                        text: 'Item created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/items');
                    });
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to create item.');
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
                console.error('Error creating item:', error);
            });
    };

    return (
        <div className="create-item-page">
            <AdminHeader />
            <main>
                <CreateItemForm onSubmit={handleSubmit} />
            </main>
            <AdminFooter />
        </div>
    );
};

export default CreateItemPage;
