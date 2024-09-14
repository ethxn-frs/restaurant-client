export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return true;
        } else {
            logout();
            return false;
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        logout();
        return false;
    }
};
