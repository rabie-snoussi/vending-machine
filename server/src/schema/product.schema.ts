import { object, string, number } from 'yup';

export const createProductSchema = object({
  body: object({
    productName: string().required('Product name is required'),
    amountAvailable: number().required('Product amount is required').min(0),
    cost: number()
      .required('Product cost is required')
      .min(5)
      .test(
        'costValue',
        'Cost must be multiples of 5',
        (num) => !(num && num % 5),
      ),
  }),
});

export const updateProductSchema = object({
  body: object({
    productName: string().required('Product name is required'),
    amountAvailable: number().required('Product amount is required').min(0),
    cost: number()
      .required('Product cost is required')
      .min(5)
      .test(
        'costValue',
        'Cost must be multiples of 5',
        (num) => !(num && num % 5),
      ),
  }),
});

export const buyProductSchema = object({
  body: object({
    productId: string().required('Product id is required'),
    amount: number().required('Amount of the product is required').min(1),
  }),
});
