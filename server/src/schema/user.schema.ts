import { object, string, ref, number } from 'yup';

export const createUserSchema = object({
  body: object({
    username: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .test(
        'passwordStrength',
        'Password must be between 8 and 24 with at least 1 capital letter.',
        (pwd) => {
          const regex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,24}$/;
          return !!(pwd && regex.test(pwd));
        },
      ),
    passwordConfirmation: string()
      .required('Password confirmation is required')
      .oneOf([ref('password'), null], 'Passwords must match'),
    role: string()
      .required('Role is required')
      .oneOf(['buyer', 'seller'], 'Role incorrect'),
  }),
});

export const updateUserSchema = object({
  body: object({
    username: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .test(
        'passwordStrength',
        'Password must be between 8 and 24 with at least 1 capital letter.',
        (pwd) => {
          const regex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,24}$/;
          return !!(pwd && regex.test(pwd));
        },
      ),
    passwordConfirmation: string()
      .required('Password confirmation is required')
      .oneOf([ref('password'), null], 'Passwords must match'),
    role: string()
      .required('Role is required')
      .oneOf(['buyer', 'seller'], 'Role incorrect'),
  }),
});

export const depositSchema = object({
  body: object({
    amount: number()
      .required('The amount should be atleast 5')
      .oneOf([5, 10, 20, 50, 100], 'Can only deposit 5, 10, 20, 50 or 100'),
  }),
});
