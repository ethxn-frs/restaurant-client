import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface ChangePasswordDialogProps {
    userId: number;
    onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ userId, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to change password.');
            }

            Swal.fire({
                icon: 'success',
                title: 'Password Changed',
                text: 'Your password has been updated successfully!',
            });
            onClose();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An unexpected error occurred while changing the password.',
            });
        }
    };

    return (
        <div className="change-password-dialog">
            <h3>Change Password</h3>
            <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
                type="button"
                onClick={handleChangePassword}
                disabled={newPassword !== confirmNewPassword || !newPassword}
                className="submit-button"
            >
                Submit
            </button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </div>
    );
};

export default ChangePasswordDialog;