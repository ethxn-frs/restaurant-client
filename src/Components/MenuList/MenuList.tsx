import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import './MenuList.css'

interface MenuListProps {
    items: {
        id: number;
        name: string;
        description: string;
        price: number;
        category: Category | null;
        type: string;
    }[];
}

interface Category {
    id: number;
    name: string;
}


const MenuList: React.FC<MenuListProps> = ({ items }) => {
    return (
        <div className="menu-list">
            {items.map((item) => (
                <MenuItem
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    category={item?.category?.name}
                    type={item.type}
                />
            ))}
        </div>
    );
};

export default MenuList;
