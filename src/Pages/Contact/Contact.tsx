import React, { useEffect, useState } from 'react';
import './Contact.css';
import Header from '../../Components/Header/Header';
import GoogleMapComponent from '../../Components/GoogleMap/GoogleMap';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Footer from '../../Components/Footer/Footer';
import ContactInfo from '../../Components/ContactInfo/ContactInfo';

interface OpeningHour {
    id: number;
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
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
    openingHours: OpeningHour[];
}

const Contact: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

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

    const workingHours = restaurant?.openingHours || [];

    return (
        <div className="contact-page">
            <Header title="Contact Us" subtitle="We'd love to hear from you!" />
            <div className="contact-content">
                <GoogleMapComponent lat={48.8566} lng={2.3522} zoom={14} />
                <div className="contact-boxes">
                    <ContactInfo
                        address={restaurant?.address || 'Loading...'}
                        email={restaurant?.email || 'Loading...'}
                        phone={restaurant?.phoneNumber || 'Loading...'}
                        workingHours={workingHours}
                    />
                    <ContactForm />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;