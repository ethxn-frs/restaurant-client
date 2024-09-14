// src/Components/OpeningHoursTable.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './OpeningHoursTable.css';

interface OpeningHour {
    id: number;
    dayOfWeek: string;
    openingTime: string;
    closingTime: string;
}

interface OpeningHoursTableProps {
    openingHours: OpeningHour[];
    onAdd: (hour: Omit<OpeningHour, 'id'>) => void;
    onUpdate: (id: number, updates: Partial<OpeningHour>) => void;
    onDelete: (id: number) => void;
}

const OpeningHoursTable: React.FC<OpeningHoursTableProps> = ({ openingHours, onAdd, onUpdate, onDelete }) => {
    const handleAddOpeningHour = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add Opening Hour',
            html: `
                <input id="dayOfWeek" class="swal2-input" placeholder="Day of Week" />
                <input id="openingTime" type="time" class="swal2-input" placeholder="Opening Time" />
                <input id="closingTime" type="time" class="swal2-input" placeholder="Closing Time" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const dayOfWeek = (document.getElementById('dayOfWeek') as HTMLInputElement).value;
                const openingTime = (document.getElementById('openingTime') as HTMLInputElement).value;
                const closingTime = (document.getElementById('closingTime') as HTMLInputElement).value;
                if (!dayOfWeek || !openingTime || !closingTime) {
                    Swal.showValidationMessage('Please fill out all fields');
                    return null;
                }
                return { dayOfWeek, openingTime, closingTime };
            },
        });

        if (formValues) {
            onAdd(formValues);
        }
    };

    const handleEditOpeningHour = async (hour: OpeningHour) => {
        const { value: formValues } = await Swal.fire({
            title: 'Edit Opening Hour',
            html: `
                <input id="dayOfWeek" class="swal2-input" placeholder="Day of Week" value="${hour.dayOfWeek}" />
                <input id="openingTime" type="time" class="swal2-input" value="${hour.openingTime}" />
                <input id="closingTime" type="time" class="swal2-input" value="${hour.closingTime}" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const dayOfWeek = (document.getElementById('dayOfWeek') as HTMLInputElement).value;
                const openingTime = (document.getElementById('openingTime') as HTMLInputElement).value;
                const closingTime = (document.getElementById('closingTime') as HTMLInputElement).value;
                if (!dayOfWeek || !openingTime || !closingTime) {
                    Swal.showValidationMessage('Please fill out all fields');
                    return null;
                }
                return { dayOfWeek, openingTime, closingTime };
            },
        });

        if (formValues) {
            onUpdate(hour.id, formValues);
        }
    };

    const handleDeleteOpeningHour = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this opening hour?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id);
            }
        });
    };

    return (
        <div className="opening-hours-table-container">
            <h2>Opening Hours</h2>
            <button onClick={handleAddOpeningHour} className="add-button">Add Opening Hour</button>
            <table className="opening-hours-table">
                <thead>
                    <tr>
                        <th>Day of Week</th>
                        <th>Opening Time</th>
                        <th>Closing Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {openingHours.map((hour) => (
                        <tr key={hour.id}>
                            <td>{hour.dayOfWeek}</td>
                            <td>{hour.openingTime}</td>
                            <td>{hour.closingTime}</td>
                            <td>
                                <button
                                    onClick={() => handleEditOpeningHour(hour)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteOpeningHour(hour.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OpeningHoursTable;