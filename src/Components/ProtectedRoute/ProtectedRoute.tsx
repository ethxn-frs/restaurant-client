import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../Utils/auth';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setIsAuth(result);
        };

        checkAuth();
    }, []);
    if (isAuth === null) {
        return <div>Loading...</div>;
    }
    if (!isAuth) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
