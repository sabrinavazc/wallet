import { SET_USER } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  // aqui quando eu rodar o meu update eu vou voltar tudo que ta no estado e eu não to mexendo e também o meu payload como item adicional que ta no action.payload
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
