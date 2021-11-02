export interface User {
  _id: string;
  username: string;
  deposit: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserCreation {
  username: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
export interface UserUpdate {
  username: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
export interface Product {
  _id: string;
  sellerId: string;
  productName: string;
  cost: number;
  amountAvailable: number;
  createdAt: string;
  updatedAt: string;
}
export interface Deposit {
  amount: number;
}
export interface Purchase {
  productId: string;
  amount: number;
}

export interface PurchaseInfo {
  change: {
    '5'?: number;
    '10'?: number;
    '20'?: number;
    '50'?: number;
    '100'?: number;
  };
  product: Product;
  totalCost: number;
}

export interface ProductCreation {
  productName: string;
  cost: number;
  amountAvailable: number;
}

export interface ProductUpdate {
  productName: string;
  cost: number;
  amountAvailable: number;
}
