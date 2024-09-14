import React from 'react';
import './ContactInfo.css';

interface OpeningHour {
    id: number;
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
}

interface ContactInfoProps {
    address: string;
    email: string;
    phone: string;
    workingHours: OpeningHour[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ address, email, phone, workingHours }) => {
    return (
        <div className="contact-info">
            <h2>Our Contact Information</h2>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <div className="working-hours">
                <h3>Working Hours:</h3>
                <ul>
                    {workingHours.map((hour) => (
                        <li key={hour.id}>
                            <strong>{hour.dayOfWeek}:</strong> {hour.openingTime.slice(0, 5)} - {hour.closingTime.slice(0, 5)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContactInfo;