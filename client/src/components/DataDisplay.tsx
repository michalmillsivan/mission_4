import React, { useState } from 'react';
import { getOperations } from '../services/opperationService';
import { Operation } from '../services/types';
import { useNavigate } from "react-router-dom";

const DataDisplay: React.FC = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [operations, setOperations] = useState<Operation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleFetch = async () => {
        try {
            setError(null);
            const response = await getOperations(accountNumber);
            console.log(response.data);
            setOperations(response.data);
        } catch (err) {
            console.error(err);
            setError('Could not fetch operations. Check the account number or server.');
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            
            <h2>Bank Account Operations Page</h2>
            <div>
                <label>Account Number:</label>
                <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <button onClick={handleFetch}>Fetch Operations</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginTop: '1rem' }}>
                {operations.map((op) => (
                    <div
                        key={op._id}
                        style={{
                            border: '1px solid #ccc',
                            marginBottom: '8px',
                            padding: '8px',
                        }}
                    >
                        <p>Type: {op.type}</p>
                        <p>Amount: {op.amount}</p>
                        {op.type === 'loan' && (
                            <>
                                <p>Interest: {op.interest}</p>
                                <p>Payments Count: {op.paymentsCount}</p>
                            </>
                        )}
                        <p>
                            Date:{' '}
                            {op.date
                                ? new Date(op.date).toLocaleString()
                                : 'No date available'}
                        </p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/make-action')}>Make a Bank Action</button>
        </div>
        
    )
}

export default DataDisplay;