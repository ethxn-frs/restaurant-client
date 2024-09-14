// src/Pages/EditItemPage/EditItemPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditItemForm from '../../Components/EditItemForm/EditItemForm';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import './EditItemPage.css';

const EditItemPage: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    const handleSubmit = (data: any) => {
        fetch(`${API_URL}/items/${data.id}`, {
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
                        text: 'Item updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/items');
                    });
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to update item.');
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
                console.error('Error updating item:', error);
            });
    };

    return (
        <div className="edit-item-page">
            <AdminHeader />
            <main>
                <div className="edit-item-container"> {/* Nouveau conteneur pour le centrage */}
                    <EditItemForm onSubmit={handleSubmit} />
                </div>
            </main>
            <AdminFooter />
        </div>
    );
};

export default EditItemPage;
