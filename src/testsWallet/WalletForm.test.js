import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('WalletForm', () => {
  it('deve renderizar corretamente os campos do formulário', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const valueInput = screen.getByTestId(/value-input/i);
    const descriptionInput = screen.getByTestId(/description-input/i);
    const methodInput = screen.getByTestId(/method-input/i);
    const tagInput = screen.getByTestId('tag-input');

    expect(screen.getByLabelText(/Valor/i)).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();

    expect(screen.getByLabelText(/Descrição da despesa/i)).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    expect(screen.getByLabelText(/Método de Pagamento/i)).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();

    expect(screen.getByLabelText(/Categoria da despesa/i)).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });

  it('deve validar corretamente os campos do formulário', () => {
    const initialState = {
      wallet: {
        wallets: [],
      },
    };

    renderWithRouterAndRedux(<WalletForm />, { initialState });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    const testValue = '100';

    // Preenche os campos do formulário
    userEvent.type(valueInput, testValue);
    userEvent.type(descriptionInput, 'Despesa teste');
    userEvent.selectOptions(tagInput, 'Lazer');

    // Verifica se o botão está habilitado após preencher os campos
    expect(addButton).toBeEnabled();

    // Limpa os campos do formulário
    userEvent.clear(valueInput);
    userEvent.clear(descriptionInput);
  });

  it('deve adicionar a despesa corretamente', () => {
    const initialState = {
      wallet: {
        expenses: [],
      },
    };

    renderWithRouterAndRedux(<WalletForm />, { initialState });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: 'Adicionar despesa' });

    const testValue = '100';

    // Preenche os campos do formulário
    userEvent.type(valueInput, testValue);
    userEvent.type(descriptionInput, 'Despesa de teste');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');

    // Clica no botão de adicionar
    userEvent.click(addButton);
  });
});
