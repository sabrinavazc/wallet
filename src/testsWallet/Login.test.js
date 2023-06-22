import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';

const email = 'email-input';
const senha = 'password-input';
const emailValidInput = 'nome@email.com';

afterEach(() => jest.clearAllMocks());

describe('Pagina de Login', () => {
  it('Verifica a se a rota "/" direciona para pagina de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica rederização dos inputs de email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const capturEmail = screen.getByTestId(email);
    const capturSenha = screen.getByTestId(senha);

    expect(capturEmail).toBeInTheDocument();
    expect(capturSenha).toBeInTheDocument();
  });

  it('Verifica se o botão "Entrar" é renderizado na tela', () => {
    renderWithRouterAndRedux(<App />);

    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    expect(buttonLogin).toBeInTheDocument();
  });

  it('Verifica o disabled do button da tela de login', () => {
    renderWithRouterAndRedux(<App />);

    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    const capturEmail = screen.getByTestId(email);
    userEvent.type(capturEmail, 'emailinvalido');
    const capturSenha = screen.getByTestId(senha);
    userEvent.type(capturSenha, 'erro');

    expect(buttonLogin).toBeDisabled();
    expect(buttonLogin).toBeDisabled();
    expect(buttonLogin).toBeDisabled();
  });

  it('Verifica se email é salvo no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const capturEmail = screen.getByTestId(email);
    userEvent.type(capturEmail, emailValidInput);
    const capturSenha = screen.getByTestId(senha);
    userEvent.type(capturSenha, 'senhacorreta');
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);

    expect(store.getState().user.email).toBe(emailValidInput);
  });

  it('Verifica se a rota é altera para CARTEIRA ao clicar em ENTRAR', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const capturEmail = screen.getByTestId(email);
    userEvent.type(capturEmail, emailValidInput);
    const capturSenha = screen.getByTestId(senha);
    userEvent.type(capturSenha, 'senhacorreta');
    const buttonLogin = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonLogin);
    expect(history.location.pathname).toBe('/carteira');
  });
});
