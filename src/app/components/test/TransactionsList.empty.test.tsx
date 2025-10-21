import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionsList from './TransactionList';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  description?: string;
  category?: string;
};

const mockTransactions: Transaction[] = [];

describe('TransactionsList (test que debe fallar)', () => {
  it('debería mostrar el mensaje "No transactions found" cuando no hay movimientos', async () => {
    render(<TransactionsList items={mockTransactions} simulateLoadingMs={0} />);


    await waitForElementToBeRemoved(() => screen.queryByText(/Loading transactions.../i));

   
    expect(screen.getByText(/No transactions found/i)).toBeInTheDocument();
  });
});