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

describe('TransactionsList empty state', () => {
  it('muestra estado vacío cuando no hay movimientos', async () => {
    render(<TransactionsList items={mockTransactions} simulateLoadingMs={0} />);

    // Esperar a que desaparezca el indicador de carga y comprobar mensaje vacío
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading transactions.../i));

    expect(screen.getByText(/No items available/i)).toBeDefined();
  });

  it('muestra estado vacío tras aplicar un filtro que no retorna resultados', async () => {
    const items = [
      { id: '1', date: '2025-08-01', description: 'A', amount: 1, category: 'X' },
    ];
    render(<TransactionsList items={items} simulateLoadingMs={0} />);

    // Esperar a que desaparezca la carga
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading transactions.../i));

    const input = screen.getByLabelText(/Filter by description/i);
    fireEvent.change(input, { target: { value: 'NoExiste' } });

    expect(screen.getByText(/No items available/i)).toBeDefined();
  });
});
