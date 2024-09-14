import React from 'react';
import './LoginPage.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <Header title="Connection" subtitle="Log in to access and manage the website" />
            <div className="login-container">
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
