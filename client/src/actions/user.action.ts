import { SET_USER, RESET_USER, AUTHENTICATE, GET_USER } from 'shared/constants';
import { UserInterface, Credentials } from 'shared/interfaces';

export const setUser = (payload: UserInterface) => ({
  type: SET_USER,
  payload,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const authenticate = (data: Credentials) => ({
  type: AUTHENTICATE,
  payload: data,
});

export const getUser = () => ({
  type: GET_USER,
});
