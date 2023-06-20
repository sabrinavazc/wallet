// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRIENCIES, REQUEST_CURRIENCIES } from '../actions/actionsTypes';

// estado inicial da carteira
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRIENCIES: // requisição ocorreu ok
    return {
      ...state,
      isLoading: true,
    };
  // case RECEIVE_ERROR: // requisição deu erro
  //   return {
  //     ...state,
  //     isLoading: false,
  //   };
  case RECEIVE_CURRIENCIES: // ação com os dados recebidos
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default walletReducer;
