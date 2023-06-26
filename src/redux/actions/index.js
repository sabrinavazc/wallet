import {
  SET_USER, EDIT_EXPENSE,
  DELETE_EXPENSE,
  RECEIVE_CURRIENCIES, REQUEST_CURRIENCIES, RECEIVE_ERROR, SET_NEW_EXPENSE,
} from './actionsTypes';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: user,
});

// é a action que dispara a acao de fazer uma requisicao para API
export const requestCurrencies = () => ({
  type: REQUEST_CURRIENCIES,
});
// recebe os dados de verdade
export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRIENCIES,
  currencies,
});

// em caso de erro na requisição
export const receiveError = () => ({
  type: RECEIVE_ERROR,
});

// seta novas despesas no estado
export const setNewExpense = (expense) => ({
  type: SET_NEW_EXPENSE,
  expense,
});

// deleta uma despesa posta na tabela
// actions.js
export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch(URL);
  const data = await response.json();
  const filter = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(receiveCurrencies(filter));
};

// nova requisição para o btn adc despesa
export const fetchNewExpense = (state) => async (dispatch) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const { currency, description, method, tag, value, id } = state;

    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(setNewExpense(expense));
  } catch (error) {
    console.error('Error fetching new expense:', error);
  }
};
