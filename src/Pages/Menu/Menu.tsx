// src/Pages/Menu.tsx
import React, { useState, useEffect, useCallback } from 'react';
import './Menu.css';
import Header from '../../Components/Header/Header';
import CategoryFilter from '../../Components/Filter/CategoryFilter';
import TypeFilter from '../../Components/Filter/TypeFilter';
import MenuList from '../../Components/MenuList/MenuList';
import Footer from '../../Components/Footer/Footer';
import SearchBar from '../../Components/Filter/SearchBar';

interface Category {
    id: number;
    name: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category | null; // Category can be null
    type: string;
}

const Menu: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    const types = ['Entrée', 'Plat', 'Dessert', 'Boisson'];
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Unexpected categories data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [API_URL]);

    // Function to fetch items
    const fetchItems = useCallback(() => {
        const categoryParam = selectedCategories.length > 0 ? `&categoryId=${selectedCategories.join(',')}` : '';
        const typeParam = selectedTypes.length > 0 ? `&type=${selectedTypes.join(',')}` : '';
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';

        fetch(`${API_URL}/items?page=${currentPage}&limit=${itemsPerPage}${categoryParam}${typeParam}${searchParam}`)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.items)) {
                    setMenuItems(
                        data.items.map((item: MenuItem) => ({
                            ...item,
                            category: item.category ? item.category : null,
                            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                        }))
                    );
                    setTotalPages(Math.ceil(data.count / itemsPerPage));
                } else {
                    console.error('Unexpected items data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, [API_URL, currentPage, selectedCategories, selectedTypes, searchTerm, itemsPerPage]);

    // Use effect to trigger fetching items
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Debounce effect for search term to avoid excessive requests
    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchItems();
        }, 500); // Debounce time in milliseconds

        return () => clearTimeout(debounceFetch); // Cleanup on unmount or searchTerm change
    }, [searchTerm, fetchItems]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="menu-page">
            <Header title="Our Menu" subtitle="Explore our delicious offerings!" />
            <div className="menu-filters">
                <CategoryFilter
                    categories={categories.map(category => category)}
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                />
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <TypeFilter
                    types={types}
                    selectedTypes={selectedTypes}
                    onTypeChange={setSelectedTypes}
                />
            </div>
            <MenuList items={menuItems} />
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Menu;