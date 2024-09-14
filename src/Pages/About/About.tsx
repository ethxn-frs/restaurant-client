import React from 'react';
import './About.css';  // Fichier CSS pour les styles spécifiques à la page About
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const About: React.FC = () => {
    return (
        <div className="about-page">
            <Header title="About Us" subtitle="Our Story and Mission" />
            <main className="about-content">
                <section className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Established in 2005, our restaurant has been serving delicious food made with the freshest ingredients.
                        We believe in providing a warm and welcoming atmosphere for all our guests.
                    </p>
                </section>
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to deliver high-quality food with exceptional service, creating memorable dining experiences.
                        Whether you are looking for a quick bite or a place to celebrate a special occasion, we are here for you.
                    </p>
                </section>
                <section className="about-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Fresh ingredients and authentic recipes</li>
                        <li>Friendly staff and great atmosphere</li>
                        <li>Commitment to quality and customer satisfaction</li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
