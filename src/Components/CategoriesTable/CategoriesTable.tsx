// src/Components/CategoriesTable.tsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './CategoriesTable.css';
import { useNavigate } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
}

const CategoriesTable: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch categories.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error fetching categories:', error);
            });
    }, [API_URL]);

    useEffect(() => {
        if (sortConfig !== null) {
            const sortedCategories = [...categories].sort((a, b) => {
                if (a[sortConfig.key as keyof Category] < b[sortConfig.key as keyof Category]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key as keyof Category] > b[sortConfig.key as keyof Category]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
            setCategories(sortedCategories);
        }
    }, [sortConfig, categories]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/categories/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            setCategories(categories.filter(category => category.id !== id));
                            Swal.fire(
                                'Deleted!',
                                'Category has been deleted.',
                                'success'
                            );
                        } else {
                            throw new Error('Failed to delete category.');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                        console.error('Error deleting category:', error);
                    });
            }
        });
    };

    return (
        <div className="categories-table-container">
            <div className="table-actions">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <button onClick={() => { navigate('/admin/categories/create') }} className="create-button">Create New Category</button>
            </div>
            <table className="categories-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => navigate(`edit/${category.id}`)} className="edit-button">Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CategoriesTable;