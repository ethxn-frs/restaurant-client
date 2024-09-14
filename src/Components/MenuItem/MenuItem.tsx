import React from 'react';
import './MenuItem.css'

interface MenuItemProps {
    name: string;
    description: string;
    price: string | number;
    category: string | undefined;
    type: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, category, type }) => {
    const formattedPrice = typeof price === 'string' ? parseFloat(price).toFixed(2) : price.toFixed(2);

    return (
        <div className="menu-item">
            <h3>{name}</h3>
            <p>{description}</p>
            <br />
            <p>Price: ${formattedPrice}</p>
            <br />
            <p>Type: {type}</p>
        </div>
    );
};

export default MenuItem;