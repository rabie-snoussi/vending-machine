import { object, string, ref, number } from 'yup';

export const createUserSchema = object({
  body: object({
    username: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: string()
      .required('Password confirmation is required')
      .oneOf([ref('password'), null], 'Passwords must match'),
    role: string().required('Role is required').oneOf(['buyer', 'seller'], 'Role incorrect'),
  }),
});

export const updateUserSchema = object({
  body: object({
    username: string(),
    password: string()
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    role: string().oneOf(['buyer', 'seller'], 'Role incorrect'),
  }),
});

export const depositSchema = object({
  body: object({
    amount: number()
      .required('The amount should be atleast 5')
      .oneOf([5, 10, 20, 50, 100], 'Can only deposit 5, 10, 20, 50 or 100'),
  }),
});
