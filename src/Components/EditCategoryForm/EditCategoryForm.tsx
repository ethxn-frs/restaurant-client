import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EditCategoryForm.css';

interface EditCategoryFormProps {
    onSubmit: (data: any) => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ onSubmit }) => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState({
        id: id || '',
        name: '',
    });
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/categories/${id}`)
                .then(response => response.json())
                .then(data => setFormData({ ...formData, name: data.name }))
                .catch(error => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to fetch category data.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    console.error('Error fetching category data:', error);
                });
        }
    }, [id, API_URL]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="edit-category-form" onSubmit={handleSubmit}>
            <h2>Edit Category</h2>
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
            <button type="submit">Save Changes</button>
            <Link to="/admin/categories" className="cancel-button">Cancel</Link>
        </form>
    );
};

export default EditCategoryForm;