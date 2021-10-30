import { object, string } from 'yup';

export const createSessionSchema = object({
  body: object({
    username: string().required('Username is required'),
    password: string().required('Password is required'),
  }),
});
