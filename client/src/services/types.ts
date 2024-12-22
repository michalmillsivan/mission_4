export interface Operation {
    _id?: string;
    accountNumber: string;
    type: 'deposit' | 'withdraw' | 'loan';
    amount: number;
    date?: string | Date;   // The server may return a string; can be store as Date or string
    interest?: number;      // for loan
    paymentsCount?: number; // for loan
  }