import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface InviteUserDialogProps {
    onInviteSuccess: () => void;
}

const InviteUserDialog: React.FC<InviteUserDialogProps> = ({ onInviteSuccess }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleInvite = async (firstName: string, lastName: string, email: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to invite user');
            }

            Swal.fire({
                title: 'Success',
                text: 'User invited successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                onInviteSuccess();
                resetForm();
            });
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
                preConfirm: () => {
                    showInviteDialog();
                },
            });
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
    };

    const showInviteDialog = () => {
        Swal.fire({
            title: 'Invite User',
            html: `
                <input id="firstName" class="swal2-input" placeholder="First Name" value="${firstName}" />
                <input id="lastName" class="swal2-input" placeholder="Last Name" value="${lastName}" />
                <input id="email" type="email" class="swal2-input" placeholder="Email" value="${email}" />
            `,
            showCancelButton: true,
            confirmButtonText: 'Invite',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
                const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
                const emailInput = document.getElementById('email') as HTMLInputElement;

                if (!firstNameInput.value || !lastNameInput.value || !emailInput.value) {
                    Swal.showValidationMessage('Please fill out all fields');
                    return false;
                }

                return {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    email: emailInput.value,
                };
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                handleInvite(result.value.firstName, result.value.lastName, result.value.email);
            }
        });
    };

    return <button onClick={showInviteDialog} className="create-button">Invite New User</button>;
};

export default InviteUserDialog;