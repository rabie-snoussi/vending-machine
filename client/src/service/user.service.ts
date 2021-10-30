import axios from 'axios';
import { Credentials, UserCreation } from 'shared/interfaces';
import { API } from 'shared/constants';

export const getUserRequest = () => {
  const response = axios.get(`${API}/user`, {
    withCredentials: true,
  });

  return response;
};

export const signInRequest = (payload: Credentials) => {
  const response = axios.post(`${API}/auth`, payload, {
    withCredentials: true,
  });

  return response;
};

export const signUpRequest = (payload: UserCreation) => {
  const response = axios.post(`${API}/users`, payload, {
    withCredentials: true,
  });

  return response;
};
