import { call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import {
  setProducts,
  setPurchaseInfo,
  updateProducts,
  setProduct,
  removeProduct,
} from 'actions/product.action';
import { setUser } from 'actions/user.action';
import {
  getProductsRequest,
  buyProductRequest,
  addProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from 'services/product.service';
import { toast } from 'react-toastify';
import {
  Product,
  ProductCreation,
  ProductUpdate,
  Purchase,
} from 'shared/interfaces';

interface BuyProduct {
  type: string;
  payload: Purchase;
}

interface AddProduct {
  type: string;
  payload: ProductCreation;
}

interface UpdateProduct {
  type: string;
  payload: { productId: string; data: ProductUpdate };
}

interface DeleteProduct {
  type: string;
  payload: Product;
}

export function* handleGetProducts() {
  try {
    const response: ReturnType<typeof getProductsRequest> = yield call(
      getProductsRequest,
    );

    const products = get(response, 'data');

    yield put(setProducts(products));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleBuyProduct({ payload }: BuyProduct) {
  try {
    const response: ReturnType<typeof buyProductRequest> = yield call(
      buyProductRequest,
      payload,
    );

    const purchaseInfo = get(response, 'data');
    const product = get(response, 'data.product');
    const user = get(response, 'data.user');

    yield put(setUser(user));

    yield put(setProduct(product));

    yield put(updateProducts([product]));

    yield put(setPurchaseInfo(purchaseInfo));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleAddProduct({ payload }: AddProduct) {
  try {
    const response: ReturnType<typeof addProductRequest> = yield call(
      addProductRequest,
      payload,
    );

    const product = get(response, 'data');

    yield put(updateProducts([product]));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleUpdateProduct({ payload }: UpdateProduct) {
  try {
    const response: ReturnType<typeof updateProductRequest> = yield call(
      updateProductRequest,
      payload,
    );

    const product = get(response, 'data');

    yield put(updateProducts([product]));
  } catch (e: any) {
    toast.error(e.message);
  }
}

export function* handleDeleteProduct({ payload }: DeleteProduct) {
  try {
    yield call(deleteProductRequest, payload);

    yield put(removeProduct([payload]));
  } catch (e: any) {
    toast.error(e.message);
  }
}
