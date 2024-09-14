import React from 'react';
import Select from 'react-select';

interface CategoryFilterProps {
    categories: { id: number; name: string }[];  // categories is now an array of objects with id and name
    selectedCategories: number[];  // selectedCategories is now an array of numbers
    onCategoryChange: (categories: number[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategories, onCategoryChange }) => {
    const categoryOptions = categories.map(category => ({ value: category.id, label: category.name }));

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        onCategoryChange(selectedValues);
    };

    return (
        <div className="filter category-filter">
            <h3>Categories</h3>
            <Select
                isMulti
                options={categoryOptions}
                value={categoryOptions.filter(option => selectedCategories.includes(option.value))}
                onChange={handleChange}
                className="filter-select"
                classNamePrefix="select"
                placeholder="Select categories..."
            />
        </div>
    );
};

export default CategoryFilter;
