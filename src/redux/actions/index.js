import {
  SET_USER, RECEIVE_CURRIENCIES, REQUEST_CURRIENCIES, RECEIVE_ERROR, SET_NEW_EXPENSE,
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
export const setNewExpense = (expense, currencies) => ({
  type: SET_NEW_EXPENSE,
  expense,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch(URL);
  const data = await response.json();
  const filter = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(receiveCurrencies(filter));
};

// nova requisição para o btn adc despesa
export const fetchNewExpense = (expense) => async (dispatch) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    delete data.USDT;
    dispatch(setNewExpense(expense, data));
  } catch (error) {
    console.error('Error fetching new expense:', error);
  }
};

// console.log(expense);
