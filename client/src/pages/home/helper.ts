import { BUYER, SELLER, MODALS } from 'shared/constants';

export const onDeposit = (setModal: Function) => () => {
  setModal(MODALS.DEPOSIT);
};

export const onPurchase = (setModal: Function) => () => {
  setModal(MODALS.AMOUNT);
};

export const onAddProduct = (setModal: Function) => () => {
  setModal(MODALS.PRODUCT_CREATION);
};

export const onEditProduct = (setModal: Function) => () => {
  setModal(MODALS.PRODUCT_EDITION);
};

export const onCloseModal = (setModal: Function) => () => {
  setModal('');
};

export const isBuyer = (role: string) => role === BUYER;

export const isSeller = (role: string) => role === SELLER;

export const isOwner = (userId: string) => (sellerId: string) =>
  sellerId === userId;
