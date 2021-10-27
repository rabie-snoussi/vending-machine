import { object, string } from 'yup';

export const createSessionSchema = object({
  body: object({
    username: string().required('Username is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
  }),
});
