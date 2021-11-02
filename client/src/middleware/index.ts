import { takeLatest } from 'redux-saga/effects';
import { ACTIONS } from 'shared/constants';
import {
  handleDeleteUser,
  handleDeposit,
  handleDepositReset,
  handleGetUser,
  handleSignIn,
  handleSignOut,
  handleSignUp,
  handleUpdateUser,
} from './user.middleware';

import {
  handleGetProducts,
  handleBuyProduct,
  handleAddProduct,
  handleUpdateProduct,
  handleDeleteProduct,
} from './product.middleware';

export function* watcherSaga() {
  yield takeLatest(ACTIONS.GET_USER, handleGetUser);

  yield takeLatest(ACTIONS.UPDATE_USER, handleUpdateUser);

  yield takeLatest(ACTIONS.DELETE_USER, handleDeleteUser);

  yield takeLatest(ACTIONS.SIGN_IN, handleSignIn);

  yield takeLatest(ACTIONS.SIGN_OUT, handleSignOut);

  yield takeLatest(ACTIONS.SIGN_UP, handleSignUp);

  yield takeLatest(ACTIONS.DEPOSIT, handleDeposit);

  yield takeLatest(ACTIONS.RESET_DEPOSIT, handleDepositReset);

  yield takeLatest(ACTIONS.GET_PRODUCTS, handleGetProducts);

  yield takeLatest(ACTIONS.BUY_PRODUCT, handleBuyProduct);

  yield takeLatest(ACTIONS.ADD_PRODUCT, handleAddProduct);

  yield takeLatest(ACTIONS.UPDATE_PRODUCT, handleUpdateProduct);

  yield takeLatest(ACTIONS.DELETE_PRODUCT, handleDeleteProduct);
}
