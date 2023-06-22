// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRIENCIES, REQUEST_CURRIENCIES,
  SET_NEW_EXPENSE } from '../actions/actionsTypes';

// estado inicial da carteira
const INITIAL_STATE = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false,
  idToEdit: 0,
  isLoading: false,
  id: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRIENCIES: // requisição ocorreu ok
    return {
      ...state,
      isLoading: true,
    };

  case RECEIVE_CURRIENCIES: // ação com os dados recebidos
    return {
      ...state,
      currencies: action.currencies,
    };

  case SET_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };

  default:
    return state;
  }
};

export default walletReducer;
