import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './Home.css';
import { useNavigate } from 'react-router-dom';


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
}

const Home: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';
    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${API_URL}/restaurant`)
            .then(response => response.json())
            .then(data => {
                setRestaurant(data);
            })
            .catch(error => {
                console.error('Error fetching restaurant data:', error);
            });
    }, [API_URL]);

    return (
        <div className="home-page">
            <Header title={`Welcome to ${restaurant?.name}`} subtitle="Delicious food, great service!" />

            <section className="hero-section">
                <img src="images/restaurant-bg.jpg" alt="Delicious food" className="hero-image" />
                <div className="hero-content">
                    <h2>Experience the Taste of Excellence</h2>
                    <button onClick={() => navigate('/menu')} className="cta-button">View Menu</button>
                </div>
            </section>

            <section className="about-section">
                <h3>About Us</h3>
                <p>{restaurant ? restaurant.description : 'Loading...'}</p>
            </section>

            <section className="reviews-section">
                <h3>What Our Customers Say</h3>
                <blockquote>"The best dining experience I've ever had. The food was amazing!" - John Doe</blockquote>
                <blockquote>"Great atmosphere and delicious meals!" - Jane Smith</blockquote>
            </section>

            <section className="contact-section">
                <h3>𝌕 Contact Us 𝌕</h3>
                <p>📍 {restaurant ? restaurant.address : 'Loading...'}</p>
                <p>📧 Email: {restaurant ? restaurant.email : 'Loading...'}</p>
                <p>📞 Phone: {restaurant ? restaurant.phoneNumber : 'Loading...'}</p>
            </section>

            <Footer />
        </div>
    );
};

export default Home;