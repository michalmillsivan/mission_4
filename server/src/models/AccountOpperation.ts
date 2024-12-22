import mongoose, { Schema } from "mongoose";

export interface Opperation {
    accountNumber: string;
    type: 'deposit' | 'withdraw'| 'loan';
    amount: number;
    date: Date;
    interest?: number;
    payment?: number;  
}

const accountOpperationSchema: Schema = new mongoose.Schema<Opperation>({
    accountNumber: { type: String, required: true },
    type: { type: String, enum: ['deposit', 'withdraw', 'loan'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    interest: { type: Number, default: null },
    payment: { type: Number, default: null }
})

export default mongoose.model<Opperation>('Opperation', accountOpperationSchema)