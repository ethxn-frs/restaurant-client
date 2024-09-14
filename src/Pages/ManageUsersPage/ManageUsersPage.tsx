import React, { useEffect, useState } from 'react';
import UsersTable from '../../Components/UsersTable/UsersTable';
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

const ManageUsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users?page=${page}&limit=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.users);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    fetchUsers(page);
                } catch (error: any) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="users-page">
            <AdminHeader />
            <main style={{ textAlign: "center" }} className="users-content">
                <h1>Manage Users</h1>
                <UsersTable
                    users={users}
                    onDelete={handleDeleteUser}
                    onInviteSuccess={() => fetchUsers(page)}
                />
            </main>
            <AdminFooter />
        </div>
    );
};

export default ManageUsersPage;