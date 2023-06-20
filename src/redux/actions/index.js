import { SET_USER, SET_DATA_WALLET, ADD_EXPENSE } from './actionsTypes';

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setWalletAction = (dataWallet) => ({
  type: SET_DATA_WALLET,
  payload: dataWallet,
});

export const addExpenseAction = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});
