import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditItemForm.css';

interface Category {
    id: number;
    name: string;
}

interface EditItemFormProps {
    onSubmit: (data: any) => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ onSubmit }) => {
    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        type: '',
    });
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

    useEffect(() => {
        fetch(`${API_URL}/items/${id}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    price: data.price ? data.price.toString() : '',
                    categoryId: data.category ? data.category.id.toString() : '',
                    type: data.type || '',
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch item details.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error fetching item details:', error);
            });

        // Fetch categories
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch categories.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error fetching categories:', error);
            });
    }, [API_URL, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: parseInt(id!, 10), ...formData });
    };

    return (
        <form className="edit-item-form" onSubmit={handleSubmit}>
            <h2>Edit Item</h2>

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
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="Entrée">Entrée</option>
                    <option value="Plat">Plat</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Boisson">Boisson</option>
                </select>
            </div>

            <button id="edit-item" type="submit">Save Changes</button>
            <Link to="/admin/items" className="cancel-button">Cancel</Link>
        </form>
    );
};

export default EditItemForm;
