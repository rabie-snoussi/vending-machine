import unionBy from 'lodash/unionBy';
import sortBy from 'lodash/sortBy';
import { ACTIONS } from 'shared/constants';
import { Product, PurchaseInfo } from 'shared/interfaces';

interface ProductsAction {
  type: string;
  payload: [Product];
}

interface ProductAction {
  type: string;
  payload: Product;
}

interface PurchaseInfoAction {
  type: string;
  payload: PurchaseInfo;
}

export const products = (state = [], action: ProductsAction) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS: {
      const sortedProducts = sortBy(action.payload, ['productName']);
      return sortedProducts;
    }

    case ACTIONS.UPDATE_PRODUCTS: {
      const newProducts = unionBy(action.payload, state, '_id');
      const sortedProducts = sortBy(newProducts, ['productName']);
      return sortedProducts;
    }

    case ACTIONS.REMOVE_PRODUCT: {
      const productId = action.payload[0]._id;
      const newProducts = state.filter(
        (product: Product) => product._id !== productId,
      );
      const sortedProducts = sortBy(newProducts, ['productName']);
      return sortedProducts;
    }

    default:
      return state;
  }
};

export const product = (state = null, action: ProductAction) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCT:
      return action.payload;
    case ACTIONS.RESET_PRODUCT:
      return null;
    default:
      return state;
  }
};

export const purchaseInfo = (state = null, action: PurchaseInfoAction) => {
  switch (action.type) {
    case ACTIONS.SET_PURCHASE_INFO:
      return action.payload;
    case ACTIONS.RESET_PURCHASE_INFO:
      return null;
    default:
      return state;
  }
};
