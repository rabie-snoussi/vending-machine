import { combineReducers } from 'redux';
import user from './user.reducer';
import { products, product, purchaseInfo } from './product.reducer';

export default combineReducers({
  user,
  products,
  product,
  purchaseInfo,
});
