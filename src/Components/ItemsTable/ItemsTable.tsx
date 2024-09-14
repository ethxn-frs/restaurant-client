import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import './ItemsTable.css';
import { useNavigate } from 'react-router-dom';

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    category: { id: number; name: string } | null;
    type: string;
}

interface Category {
    id: number;
    name: string;
}

const ItemsTable: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    const fetchItems = useCallback(() => {
        const categoryParam = selectedCategories.length > 0 ? `&categoryId=${selectedCategories.join(',')}` : '';
        const typeParam = selectedTypes.length > 0 ? `&type=${selectedTypes.join(',')}` : '';
        const searchParam = search ? `&search=${search}` : '';

        fetch(`${API_URL}/items?page=${currentPage}&limit=${itemsPerPage}${categoryParam}${typeParam}${searchParam}`)
            .then(response => response.json())
            .then(data => {
                setItems(data.items.map((item: Item) => ({
                    ...item,
                    price: parseFloat(item.price.toString()), // Ensure price is a number
                    category: item.category ? item.category : null,
                })));
                setTotalPages(Math.ceil(data.count / itemsPerPage));
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch items.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error('Error fetching items:', error);
            });
    }, [API_URL, currentPage, selectedCategories, selectedTypes, search, itemsPerPage]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [API_URL]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleCategoryChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setSelectedCategories(selectedValues);
    };

    const handleTypeChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setSelectedTypes(selectedValues);
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/items/${id}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            setItems(items.filter(item => item.id !== id));
                            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
                        } else {
                            throw new Error('Failed to delete item.');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                        console.error('Error deleting item:', error);
                    });
            }
        });
    };

    const categoryOptions = categories.map(category => ({ value: category.id, label: category.name }));
    const typeOptions = ['Entrée', 'Plat', 'Dessert', 'Boisson'].map(type => ({ value: type, label: type }));

    return (
        <div className="items-table-container">
            <div className="table-actions">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <Select
                    isMulti
                    options={categoryOptions}
                    value={categoryOptions.filter(option => selectedCategories.includes(option.value))}
                    onChange={handleCategoryChange}
                    className="filter-select"
                    classNamePrefix="select"
                    placeholder="Select categories..."
                />
                <Select
                    isMulti
                    options={typeOptions}
                    value={typeOptions.filter(option => selectedTypes.includes(option.value))}
                    onChange={handleTypeChange}
                    className="filter-select"
                    classNamePrefix="select"
                    placeholder="Select types..."
                />
                <button onClick={() => navigate('/admin/items/create')} className="create-button">Create New Item</button>
            </div>
            <table className="items-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('description')}>Description</th>
                        <th onClick={() => handleSort('price')}>Price</th>
                        <th onClick={() => handleSort('category')}>Category</th>
                        <th onClick={() => handleSort('type')}>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price.toFixed(2)}</td>
                            <td>{item.category?.name || ''}</td>
                            <td>{item.type}</td>
                            <td>
                                <button onClick={() => {navigate(`edit/${item.id}`)}} className="edit-button">Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
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

export default ItemsTable;