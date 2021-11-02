import coin5 from 'assets/coin_5.png';
import coin10 from 'assets/coin_10.png';
import coin20 from 'assets/coin_20.png';
import coin50 from 'assets/coin_50.png';
import coin100 from 'assets/coin_100.png';

export const PATHS = {
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  HOME: '/home',
  PROFILE: '/profile',
  ERROR: '/error',
};

export const API = process.env.REACT_APP_API;

export const MODALS = {
  DEPOSIT: 'DEPOSIT',
  AMOUNT: 'AMOUNT',
  PRODUCT_CREATION: 'PRODUCT_CREATION',
  PRODUCT_EDITION: 'PRODUCT_EDITION',
};

export const ACTIONS = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
  GET_USER: 'GET_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_PRODUCTS: 'SET_PRODUCTS',
  DEPOSIT: 'DEPOSIT',
  RESET_DEPOSIT: 'RESET_DEPOSIT',
  BUY: 'BUY',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
  GET_PRODUCTS: 'GET_PRODUCTS',
  SET_PRODUCT: 'SET_PRODUCT',
  BUY_PRODUCT: 'BUY_PRODUCT',
  RESET_PRODUCT: 'RESET_PRODUCT',
  SET_PURCHASE_INFO: 'SET_PURCHASE_INFO',
  RESET_PURCHASE_INFO: 'RESET_PURCHASE_INFO',
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
};

export const IMAGES = {
  coin5,
  coin10,
  coin20,
  coin50,
  coin100,
};

export const BUYER = 'buyer';

export const SELLER = 'seller';
