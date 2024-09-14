import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateCategoryForm.css';

interface CreateCategoryFormProps {
    onSubmit: (data: any) => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="create-category-form" onSubmit={handleSubmit}>
            <h2>Create New Category</h2>

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

            <button id='create-category' type="submit">Create Category</button>
            <Link to="/admin/categories" id="cancel-button">Cancel</Link>
        </form>
    );
};

export default CreateCategoryForm;