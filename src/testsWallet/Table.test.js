import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Table from '../components/Table';
import rootReducer from '../redux/reducers/index';

describe('Table component', () => {
  it('Verifica se as despesas são renderizadas corretamente na tabela', () => {
    const expenses = [
      {
        id: 1,
        description: 'Expense 1',
        tag: 'Tag 1',
        method: 'Method 1',
        value: '10.00',
        currency: 'USD',
        exchangeRates: {
          USD: { name: 'USD', ask: '1.00' },
          BRL: { name: 'BRL', ask: '5.50' },
        },
      },
    ];

    const store = createStore(rootReducer, { wallet: { expenses } });

    render(
      <Provider store={ store }>
        <Table />
      </Provider>,
    );

    // Verificar se as despesas são renderizadas corretamente na tabela
    expect(screen.getByText('Expense 1')).toBeInTheDocument();
    // Verificar outras despesas, tags, métodos de pagamento, etc.
  });

  it('Verifia se o botão Editar é renderizado', () => {
    const expenses = [
      {
        id: 1,
        description: 'Expense 1',
        tag: 'Tag 1',
        method: 'Method 1',
        value: '10.00',
        currency: 'USD',
        exchangeRates: {
          USD: { name: 'USD', ask: '1.00' },
          BRL: { name: 'BRL', ask: '5.50' },
        },
      },
    ];

    const store = createStore(rootReducer, { wallet: { expenses } });

    render(
      <Provider store={ store }>
        <Table />
      </Provider>,
    );

    const editButtons = screen.getAllByTestId('edit-btn');
    expect(editButtons.length).toBe(expenses.length);
  });
});
