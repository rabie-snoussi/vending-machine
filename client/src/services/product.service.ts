import axios from 'axios';
import { API } from 'shared/constants';
import {
  Purchase,
  ProductCreation,
  ProductUpdate,
  Product,
} from 'shared/interfaces';
import locale from 'shared/locale.json';
import { toastify } from './helper';

export const getProductsRequest = () => {
  const response = axios.get(`${API}/products`, {
    withCredentials: true,
  });

  return response;
};

export const buyProductRequest = (payload: Purchase) => {
  const response = axios.patch(`${API}/buy`, payload, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.purchaseSuccess,
  });

  return response;
};

export const addProductRequest = (payload: ProductCreation) => {
  const response = axios.post(`${API}/products`, payload, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.productCreationSuccess,
  });

  return response;
};

export const updateProductRequest = ({
  productId,
  data,
}: {
  productId: string;
  data: ProductUpdate;
}) => {
  const response = axios.put(`${API}/products/${productId}`, data, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.productUpdateSuccess,
  });

  return response;
};

export const deleteProductRequest = (payload: Product) => {
  const response = axios.delete(`${API}/products/${payload._id}`, {
    withCredentials: true,
  });

  toastify({
    axiosPromise: response,
    successMessage: locale.productDeletionSuccess,
  });

  return response;
};
