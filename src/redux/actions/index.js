import {
  SET_USER, RECEIVE_CURRIENCIES, REQUEST_CURRIENCIES, RECEIVE_ERROR,
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

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch(URL);
  const data = await response.json();
  const filter = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(receiveCurrencies(filter));
};

// // requisição a API retornando uma função - THUNK
// export const fetchCurrencies = () => async (dispatch) => {
//   dispatch(requestCurrencies()); // aciona o loading
//   try {
//     // faz a requisicao pra api, enquanto o loading ta ativo
//     const response = await fetch(URL);
//     const data = await response.json();
//     const currencies = Object.keys(data).filter((key) => key !== 'USDT');
//     // se deu tudo certo, dispara a action de sucesso receive passando o type e o payload que pegou na api
//     dispatch(receiveCurrencies(currencies));
//     delete data.USDT;
//     dispatch(receiveCurrencies(Object.keys(data)));
//   } catch (error) {
//     dispatch(receiveError());
//   }
// };
