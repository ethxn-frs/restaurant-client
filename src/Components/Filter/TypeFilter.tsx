import React from 'react';
import Select from 'react-select';

interface TypeFilterProps {
    types: string[];
    selectedTypes: string[];
    onTypeChange: (types: string[]) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, selectedTypes, onTypeChange }) => {
    const typeOptions = types.map(type => ({ value: type, label: type }));

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        onTypeChange(selectedValues);
    };

    return (
        <div className="filter type-filter">
            <h3>Types</h3>
            <Select
                isMulti
                options={typeOptions}
                value={typeOptions.filter(option => selectedTypes.includes(option.value))}
                onChange={handleChange}
                className="filter-select"
                classNamePrefix="select"
                placeholder="Select types..."
            />
        </div>
    );
};

export default TypeFilter;