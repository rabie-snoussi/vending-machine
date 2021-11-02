import { ACTIONS } from 'shared/constants';
import {
  Product,
  Purchase,
  ProductCreation,
  ProductUpdate,
} from 'shared/interfaces';

export const setProducts = (payload: [Product]) => ({
  type: ACTIONS.SET_PRODUCTS,
  payload,
});

export const getProducts = () => ({
  type: ACTIONS.GET_PRODUCTS,
});

export const updateProducts = (payload: [Product]) => ({
  type: ACTIONS.UPDATE_PRODUCTS,
  payload,
});

export const setProduct = (payload: Product) => ({
  type: ACTIONS.SET_PRODUCT,
  payload,
});

export const buyProduct = (payload: Purchase) => ({
  type: ACTIONS.BUY_PRODUCT,
  payload,
});

export const setPurchaseInfo = (payload: Purchase) => ({
  type: ACTIONS.SET_PURCHASE_INFO,
  payload,
});

export const resetPurchaseInfo = () => ({
  type: ACTIONS.RESET_PURCHASE_INFO,
});

export const addProduct = (payload: ProductCreation) => ({
  type: ACTIONS.ADD_PRODUCT,
  payload,
});

export const updateProduct = ({
  productId,
  data,
}: {
  productId: string;
  data: ProductUpdate;
}) => ({
  type: ACTIONS.UPDATE_PRODUCT,
  payload: { productId, data },
});

export const deleteProduct = (payload: Product) => ({
  type: ACTIONS.DELETE_PRODUCT,
  payload,
});

export const removeProduct = (payload: [Product]) => ({
  type: ACTIONS.REMOVE_PRODUCT,
  payload,
});

export const resetProduct = () => ({
  type: ACTIONS.RESET_PRODUCT,
});
