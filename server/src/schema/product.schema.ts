import { object, string, number } from 'yup';

export const createProductSchema = object({
  body: object({
    productName: string().required('Product name is required'),
    amountAvailable: number().required('Product amount is required').min(0),
    cost: number().required('Product cost is required').min(5),
  }),
});

export const updateProductSchema = object({
  body: object({
    productName: string(),
    amountAvailable: number().min(0),
    cost: number().min(5),
  }),
});
