import React, { useEffect, useState } from 'react';
import EditUserForm from '../../Components/EditUserForm/EditUserForm';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import Swal from 'sweetalert2';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
}

const EditUserPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    // Modifier le type de updatedUser pour accepter un objet partiel
    const handleUpdateUser = async (updatedUser: Partial<User>) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User updated successfully!',
            });
            navigate('/admin/home');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred while updating the user.',
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="edit-user-page">
            <AdminHeader />
            <main className="edit-user-content">
                {user ? <EditUserForm user={user} onSubmit={handleUpdateUser} /> : <div>User not found</div>}
            </main>
            <AdminFooter />
        </div>
    );
};

export default EditUserPage;