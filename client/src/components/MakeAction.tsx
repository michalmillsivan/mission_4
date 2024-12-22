import React, { useState } from 'react';
import { createOperation } from '../services/opperationService';
import { Operation } from '../services/types';
import { useNavigate } from 'react-router-dom';

const MakeAction: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [type, setType] = useState<'deposit' | 'withdraw' | 'loan'>('deposit');
  const [amount, setAmount] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [paymentsCount, setPaymentsCount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const validateFields = () => {
    if (!accountNumber || !amount) {
      setMessage('Please fill in all fields.');
      return false;
    }

    if (type === 'loan' && (!interest || !paymentsCount)) {
      setMessage('Please fill in all fields.');
      return false;
    }

    if (Number(amount) < 0 || (type === 'loan' && (Number(interest) < 0 || Number(paymentsCount) < 0))) {
        setMessage('Please enter valid values.');
        return false;
    }

    return true;
  }

  const handleSave = async () => {
    const validationError = validateFields();
        if (!validationError) {
            console.log('validationError', validationError);
            
            // setError(validationError);
            return;
        }
        // setError(null);
    try {
      const newOperation: Omit<Operation, '_id' | 'date'> = {//omit is a type similar to type but without certain properties (here exclude: '_id' and 'date')
        accountNumber,
        type,
        amount: Number(amount),
      };

      if (type === 'loan') {
        newOperation.interest = Number(interest);
        newOperation.paymentsCount = Number(paymentsCount);
      }

      await createOperation(newOperation);

      setMessage('Operation saved successfully!');
      setAmount('');
      setInterest('');
      setPaymentsCount('');
    } catch (err) {
      console.error(err);
      setMessage('Error saving operation.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Make a Bank Action</h2>
      {message && <div style={{ marginBottom: '1rem', color: 'green' }}>{message}</div>}

      <div>
        <label>Account Number: </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Action Type: </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'deposit' | 'withdraw' | 'loan')}
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="loan">Loan</option>
        </select>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {type === 'loan' && (
        <>
          <div style={{ marginTop: '1rem' }}>
            <label>Interest: </label>
            <input
              type="number"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Number of Payments: </label>
            <input
              type="number"
              value={paymentsCount}
              onChange={(e) => setPaymentsCount(e.target.value)}
              min="1"
            />
          </div>
        </>
      )}

      <button style={{ marginTop: '1rem' }} onClick={handleSave}>
        Save
      </button>
        <button style={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={() => navigate('/')}>
            Go Back
        </button>
    </div>

  );
};

export default MakeAction;
