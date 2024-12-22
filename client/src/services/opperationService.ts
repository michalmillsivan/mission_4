import axios from 'axios';
import { Operation } from './types';

const API_URL = 'http://localhost:5000/opperations';

export async function getOperations(accountNumber: string) {
    return axios.get<Operation[]>(`${API_URL}/${accountNumber}`);
}

export async function createOperation(data: Omit<Operation, '_id' | 'date'>) {
    return axios.post<Operation>(API_URL, data);
}