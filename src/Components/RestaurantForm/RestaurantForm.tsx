import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RestaurantForm.css';

interface RestaurantFormProps {
    initialData: {
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
    };
    onSubmit: (data: any) => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);
    const [originalData, setOriginalData] = useState(initialData);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

    useEffect(() => {
        fetch(`${API_URL}/restaurant`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
                setOriginalData(data);
            })
            .catch(error => console.error('Error fetching restaurant data:', error));
    }, [API_URL]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const changes = Object.entries(formData).reduce((acc, [key, value]) => {
            if (value !== originalData[key as keyof typeof originalData]) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        fetch(`${API_URL}/restaurant/${originalData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes),
        })
            .then(response => {
                if (response.ok) {
                    onSubmit(formData);
                    navigate('/admin/home');
                } else {
                    throw new Error('Failed to update restaurant information.');
                }
            })
            .catch(error => console.error('Error updating restaurant information:', error));
    };

    return (
        <form className="restaurant-form" onSubmit={handleSubmit}>
            <h2>Manage Restaurant Information</h2>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="facebook">Facebook</label>
                <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="instagram">Instagram</label>
                <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="twitter">Twitter</label>
                <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="snapchat">Snapchat</label>
                <input
                    type="text"
                    id="snapchat"
                    name="snapchat"
                    value={formData.snapchat}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Save Changes</button>
            <Link to="/admin/home" id="cancel-button">Cancel Changes</Link>
        </form>
    );
};

export default RestaurantForm;
