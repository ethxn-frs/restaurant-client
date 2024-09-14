// src/Components/PaymentMethodsTable.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './PaymentMethodsTable.css';

interface PaymentMethod {
    id: number;
    name: string;
    active: boolean;
}

interface PaymentMethodsTableProps {
    paymentMethods: PaymentMethod[];
    onAdd: (method: Omit<PaymentMethod, 'id'>) => void;
    onUpdate: (id: number, updates: Partial<PaymentMethod>) => void;
    onDelete: (id: number) => void;
}

const PaymentMethodsTable: React.FC<PaymentMethodsTableProps> = ({ paymentMethods, onAdd, onUpdate, onDelete }) => {
    const handleAddPaymentMethod = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add Payment Method',
            html: `
                <input id="paymentName" class="swal2-input" placeholder="Name" />
                <select id="paymentActive" class="swal2-input">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = (document.getElementById('paymentName') as HTMLInputElement).value;
                const active = (document.getElementById('paymentActive') as HTMLSelectElement).value === 'true';
                if (!name) {
                    Swal.showValidationMessage('Please enter a valid name');
                    return;
                }
                return { name, active };
            },
        });

        if (formValues) {
            onAdd(formValues);
        }
    };

    const handleToggleActive = (id: number, active: boolean) => {
        onUpdate(id, { active: !active });
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this payment method?',
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
        <div className="payment-methods-table-container">
            <h2>Payment Methods</h2>
            <button onClick={handleAddPaymentMethod} className="add-button">Add Payment Method</button>
            <table className="payment-methods-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentMethods.map((method) => (
                        <tr key={method.id}>
                            <td>{method.name}</td>
                            <td>{method.active ? 'Yes' : 'No'}</td>
                            <td>
                                <button
                                    onClick={() => handleToggleActive(method.id, method.active)}
                                    className="toggle-button"
                                >
                                    {method.active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => handleDelete(method.id)}
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

export default PaymentMethodsTable;