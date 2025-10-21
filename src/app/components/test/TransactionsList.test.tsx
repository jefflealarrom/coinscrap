import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import TransactionsList from './TransactionList';

const mockTransactions = [
  {
    id: 'tx_001',
    date: '2025-08-02',
    description: 'Supermercado DIA',
    amount: -37.45,
    category: 'Groceries',
  },
  {
    id: 'tx_002',
    date: '2025-08-03',
    description: 'Nómina',
    amount: 1450.0,
    category: 'Income',
  },
  {
    id: 'tx_003',
    date: '2025-08-04',
    description: 'Netflix',
    amount: -12.99,
    category: 'Subscriptions',
  },
];

describe('TransactionsList', () => {
  it('filtra por texto correctamente', async () => {
    render(<TransactionsList items={mockTransactions} simulateLoadingMs={0} />);

  const input = screen.getByLabelText(/filter by description/i);
    fireEvent.change(input, { target: { value: 'Netflix' } });
 await waitForElementToBeRemoved(() => screen.queryByText(/Loading transactions.../i));

  expect(await screen.findByText(/Netflix/)).toBeInTheDocument();
  expect(screen.queryByText(/Supermercado DIA/)).not.toBeInTheDocument();
  expect(screen.queryByText(/Nómina/)).not.toBeInTheDocument();
  });
});