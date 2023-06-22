import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import Header from '../components/Header';

describe('Header component', () => {
  it('Verifica se as despesas, moedas e email são renderizados', () => {
    const initialState = {
      user: { email: 'test@example.com' },
      wallet: {
        expenses: [
          {
            id: 1,
            exchangeRates: {
              BRL: { name: 'BRL', ask: '5.5' },
            },
            currency: 'BRL',
            value: '10',
          },
          {
            id: 2,
            exchangeRates: {
              BRL: { name: 'BRL', ask: '5.5' },
            },
            currency: 'BRL',
            value: '20',
          },
        ],
      },
    };

    renderWithRouterAndRedux(<Header />, {
      initialState,
    });

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toHaveTextContent('test@example.com');

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent('165.00');

    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toHaveTextContent('BRL');
  });
});
