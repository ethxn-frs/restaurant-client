// src/Pages/ManageRestaurantPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import RestaurantForm from '../../Components/RestaurantForm/RestaurantForm';
import AdminFooter from '../../Components/AdminFooter/AdminFooter';
import OpeningHoursTable from '../../Components/OpeningHoursTable/OpeningHoursTable';
import PaymentMethodsTable from '../../Components/PaymentMethodsTable/PaymentMethodsTable';
import './ManageRestaurantPage.css';

interface PaymentMethodData {
    id: number;
    name: string;
    active: boolean;
}

interface OpeningHour {
    id: number;
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
}

const ManageRestaurantPage: React.FC = () => {
    const [restaurantData, setRestaurantData] = useState<{
        id: number;
        name: string;
        description: string;
        phoneNumber: string;
        address: string;
        email: string;
        facebook: string;
        instagram: string;
        twitter: string;
        snapchat: string;
        openingHours: Array<{ id: number; dayOfWeek: string; openingTime: string; closingTime: string }>;
        paymentMethods: PaymentMethodData[];
    }>({
        id: 1,
        name: '',
        description: '',
        phoneNumber: '',
        address: '',
        email: '',
        facebook: '',
        instagram: '',
        twitter: '',
        snapchat: '',
        openingHours: [],
        paymentMethods: [],
    });

    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/restaurant`)
            .then(response => response.json())
            .then(data => {
                setRestaurantData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching restaurant data:', error);
                setLoading(false);
            });
    }, [API_URL]);

    const handleSubmit = (data: Partial<typeof restaurantData>) => {
        const changes = Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== restaurantData[key as keyof typeof restaurantData]) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        fetch(`${API_URL}/restaurant/${restaurantData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes),
        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Restaurant information updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/home');
                    });
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message || 'Failed to update restaurant information.');
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
                console.error('Error updating restaurant information:', error);
            });
    };

    const handleAddPaymentMethod = async (method: Omit<PaymentMethodData, 'id'>) => {
        try {
            const response = await fetch(`${API_URL}/paymentMethods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(method),
            });

            if (!response.ok) {
                throw new Error('Failed to add payment method');
            }

            const newMethod = await response.json();
            setRestaurantData((prev) => ({
                ...prev,
                paymentMethods: [...prev.paymentMethods, newMethod],
            }));

            Swal.fire('Success', 'Payment method added successfully', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleUpdatePaymentMethod = async (id: number, updates: Partial<PaymentMethodData>) => {
        try {
            const response = await fetch(`${API_URL}/paymentMethods/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                throw new Error('Failed to update payment method');
            }

            setRestaurantData((prev) => ({
                ...prev,
                paymentMethods: prev.paymentMethods.map((method) =>
                    method.id === id ? { ...method, ...updates } : method
                ),
            }));

            Swal.fire('Success', 'Payment method updated successfully', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleDeletePaymentMethod = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this payment method?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_URL}/paymentMethods/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete payment method');
                    }

                    setRestaurantData((prev) => ({
                        ...prev,
                        paymentMethods: prev.paymentMethods.filter((method) => method.id !== id),
                    }));

                    Swal.fire('Deleted!', 'Payment method has been deleted.', 'success');
                } catch (error: any) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    const handleAddOpeningHour = async (hour: Omit<OpeningHour, 'id'>) => {
        try {
            const response = await fetch(`${API_URL}/openingHours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...hour, restaurantId: restaurantData.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to add opening hour');
            }

            const newHour = await response.json();
            setRestaurantData((prev) => ({
                ...prev,
                openingHours: [...prev.openingHours, newHour],
            }));

            Swal.fire('Success', 'Opening hour added successfully', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleUpdateOpeningHour = async (id: number, updates: Partial<OpeningHour>) => {
        try {
            const response = await fetch(`${API_URL}/openingHours/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                throw new Error('Failed to update opening hour');
            }

            setRestaurantData((prev) => ({
                ...prev,
                openingHours: prev.openingHours.map((hour) =>
                    hour.id === id ? { ...hour, ...updates } : hour
                ),
            }));

            Swal.fire('Success', 'Opening hour updated successfully', 'success');
        } catch (error: any) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleDeleteOpeningHour = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this opening hour?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_URL}/openingHours/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete opening hour');
                    }

                    setRestaurantData((prev) => ({
                        ...prev,
                        openingHours: prev.openingHours.filter((hour) => hour.id !== id),
                    }));

                    Swal.fire('Deleted!', 'Opening hour has been deleted.', 'success');
                } catch (error: any) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="manage-restaurant-page">
            <AdminHeader />
            <main>
                <div className="side-component">
                    <OpeningHoursTable
                        openingHours={restaurantData.openingHours}
                        onAdd={handleAddOpeningHour}
                        onUpdate={handleUpdateOpeningHour}
                        onDelete={handleDeleteOpeningHour} />
                </div>
                <div className="main-component">
                    <RestaurantForm initialData={restaurantData} onSubmit={handleSubmit} />
                </div>
                <div className="side-component">
                    <PaymentMethodsTable
                        paymentMethods={restaurantData.paymentMethods}
                        onAdd={handleAddPaymentMethod}
                        onUpdate={handleUpdatePaymentMethod}
                        onDelete={handleDeletePaymentMethod}
                    />
                </div>
            </main>
            <AdminFooter />
        </div>
    );
};

export default ManageRestaurantPage;
