import { SET_USER, SET_DATA_WALLET } from './actionsTypes';

export const setUserAction = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setWalletAction = (dataWallet) => ({
  type: SET_DATA_WALLET,
  payload: dataWallet,
});
