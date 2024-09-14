import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditUserForm.css';
import ChangePasswordDialog from '../ChangePasswordDialog/ChangePasswordDialog';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
}

interface EditUserFormProps {
    user: User;
    onSubmit: (updatedUser: Partial<User>) => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSubmit }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUser: Partial<User> = {};
        if (firstName !== user.firstName) updatedUser.firstName = firstName;
        if (lastName !== user.lastName) updatedUser.lastName = lastName;
        if (email !== user.email) updatedUser.email = email;
        if (phoneNumber !== user.phoneNumber) updatedUser.phoneNumber = phoneNumber;

        if (Object.keys(updatedUser).length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes',
                text: 'No changes were made to the user details.',
            });
            return;
        }

        try {
            onSubmit(updatedUser);
            navigate('/admin/home');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error instanceof Error ? error.message : 'An unexpected error occurred.',
            });
        }
    };

    const handleCancel = () => {
        navigate('/admin/home');
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-form">
            <h2>Edit User</h2>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <button id="edit-user-button" type="submit">Save Changes</button>
            <button id="edit-user-button" type="button" onClick={handleCancel} className="cancel-button">Cancel Changes</button>
            <button type="button" onClick={() => setShowChangePassword(true)} className="change-password-button">Change Password</button>

            {showChangePassword && <ChangePasswordDialog userId={user.id} onClose={() => setShowChangePassword(false)} />}
        </form>
    );
};

export default EditUserForm;