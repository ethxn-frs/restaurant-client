import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ForgetPasswordDialog: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleForgetPassword = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/forget-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            Swal.fire({
                title: 'Mot de passe oublié',
                text: 'Si un compte existe avec cet email, un email de réinitialisation a été envoyé.',
                icon: 'info',
                confirmButtonText: 'OK',
            });

            setEmail('');
        } catch (error: any) {
            Swal.fire({
                title: 'Erreur',
                text: 'Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe. Veuillez réessayer plus tard.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const showForgetPasswordDialog = () => {
        Swal.fire({
            title: 'Réinitialiser votre mot de passe',
            input: 'email',
            inputLabel: 'Veuillez entrer votre adresse email',
            inputPlaceholder: 'Email',
            inputValue: email,
            showCancelButton: true,
            confirmButtonText: 'Envoyer',
            cancelButtonText: 'Annuler',
            preConfirm: (inputEmail) => {
                setEmail(inputEmail); // Set the email state with the user's input
                if (!inputEmail) {
                    Swal.showValidationMessage('Veuillez entrer une adresse email valide');
                    return false;
                }
                return handleForgetPassword(); // Call the reset password function
            },
        });
    };

    return (
        <button onClick={showForgetPasswordDialog} className="forget-password-button">
            Forgot Password
        </button>
    );
};

export default ForgetPasswordDialog;