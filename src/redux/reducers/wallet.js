// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_DATA_WALLET, ADD_EXPENSE } from '../actions/actionsTypes';

// estado inicial da carteira
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_DATA_WALLET:
    return {
      ...state,
      currencies: action.payload.currencies,
    };

  case ADD_EXPENSE: {
    const newExpense = {
      id: state.expenses.length,
      ...action.payload,
    };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
    };
  }

  default:
    return state;
  }
};

export default walletReducer;
