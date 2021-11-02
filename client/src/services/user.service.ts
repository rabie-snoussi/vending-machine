import axios from 'axios';
import {
  Credentials,
  UserCreation,
  Deposit,
  UserUpdate,
  User,
} from 'shared/interfaces';
import { API } from 'shared/constants';
import locale from 'shared/locale.json';
import { toastify } from './helper';

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

  toastify({ axiosPromise: response, successMessage: locale.welcome });

  return response;
};

export const signUpRequest = (payload: UserCreation) => {
  const response = axios.post(`${API}/users`, payload, {
    withCredentials: true,
  });

  toastify({ axiosPromise: response, successMessage: locale.welcome });

  return response;
};

export const signOutRequest = () => {
  const response = axios.delete(`${API}/auth`, {
    withCredentials: true,
  });

  return response;
};

export const depositRequest = (payload: Deposit) => {
  const response = axios.patch(`${API}/deposit`, payload, {
    withCredentials: true,
  });

  toastify({ axiosPromise: response, successMessage: locale.depositSuccess });

  return response;
};

export const updateUserRequest = ({
  userId,
  data,
}: {
  userId: string;
  data: UserUpdate;
}) => {
  const response = axios.put(`${API}/users/${userId}`, data, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.userUpdateSuccess,
  });

  return response;
};

export const deleteUserRequest = (payload: User) => {
  const response = axios.delete(`${API}/users/${payload._id}`, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.userDeletionSuccess,
  });

  return response;
};

export const depositResetRequest = () => {
  const response = axios.patch(`${API}/reset`, null, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.depositResetSuccess,
  });

  return response;
};
