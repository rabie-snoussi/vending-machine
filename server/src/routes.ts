import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  getUserFromTokenHandler,
  updateDepositHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  resetHandler,
} from './controller/user.controller';
import { signInHandler, signOutHandler } from './controller/session.controller';
import {
  createProductHandler,
  getProductsHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  buyProductHandler,
} from './controller/product.controller';
import { validateRequest } from './middleware';
import {
  isBuyer,
  isSeller,
  userAuthenticated,
} from './middleware/userAuthenticated';
import {
  createUserSchema,
  depositSchema,
  updateUserSchema,
} from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import {
  createProductSchema,
  updateProductSchema,
  buyProductSchema,
} from './schema/product.schema';

export default function (app: Express) {
  // Add a user
  app.post(
    '/api/users',
    validateRequest(createUserSchema),
    createUserHandler,
    signInHandler,
  );

  // List users
  app.get('/api/users', userAuthenticated(), getUsersHandler);

  // Get a user
  app.get('/api/users/:userId', userAuthenticated(), getUserHandler);

  // Get user from token
  app.get('/api/user', userAuthenticated(), getUserFromTokenHandler);

  // Update a user
  app.patch(
    '/api/users/:userId',
    [userAuthenticated(), validateRequest(updateUserSchema)],
    updateUserHandler,
  );

  // Delete a user
  app.delete(
    '/api/users/:userId',
    userAuthenticated(),
    deleteUserHandler,
    signOutHandler,
  );

  // Deposit
  app.patch(
    '/api/deposit',
    [userAuthenticated(isBuyer), validateRequest(depositSchema)],
    updateDepositHandler,
  );

  // Reset deposit
  app.patch('/api/reset', userAuthenticated(isBuyer), resetHandler);

  // Authenticate
  app.post('/api/auth', validateRequest(createSessionSchema), signInHandler);

  // Logout
  app.delete('/api/auth', userAuthenticated(), signOutHandler);

  // Add a product
  app.post('/api/products', [
    userAuthenticated(isSeller),
    validateRequest(createProductSchema),
    createProductHandler,
  ]);

  // List products
  app.get('/api/products', userAuthenticated(), getProductsHandler);

  // Get a product
  app.get('/api/products/:productId', userAuthenticated(), getProductHandler);

  // Update a product
  app.put('/api/products/:productId', [
    userAuthenticated(isSeller),
    validateRequest(updateProductSchema),
    updateProductHandler,
  ]);

  // Delete a product
  app.delete(
    '/api/products/:productId',
    userAuthenticated(isSeller),
    deleteProductHandler,
  );

  // Buy a product
  app.patch(
    '/api/buy',
    [validateRequest(buyProductSchema), userAuthenticated(isBuyer)],
    buyProductHandler,
  );
}
