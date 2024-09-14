import React, { useEffect, useState } from 'react';
import './Footer.css';

interface PaymentMethod {
  id: number;
  name: string;
  active: boolean;
}


interface Restaurant {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  address: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  paymentMethods: PaymentMethod[];
}

const Footer: React.FC = () => {

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

  useEffect(() => {

    fetch(`${API_URL}/restaurant`)
      .then(response => response.json())
      .then(data => {
        setRestaurant(data);
      })
      .catch(error => {
      });
  }, [API_URL]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-payment-methods">
          <h4>Payments Methods</h4>
          {restaurant ? (
            restaurant.paymentMethods.length > 0 ? (
              <ul>
                {restaurant.paymentMethods.map((method) => (
                  <li key={method.id}>
                    {method.name} {method.active ? '🟢' : '🔴'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment methods available.</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>{restaurant?.address}</p>
          <p>Email: {restaurant?.email}</p>
          <p>Phone: {restaurant?.phoneNumber}</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul className="social-links">
            <li><a href={`${restaurant?.facebook}`} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href={`${restaurant?.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={`${restaurant?.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href={`${restaurant?.snapchat}`} target="_blank" rel="noopener noreferrer">Snapchat</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {restaurant?.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;