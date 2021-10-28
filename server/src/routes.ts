import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  updateDepositHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  resetHandler,
} from './controller/user.controller';
import {
  createSessionHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import { validateRequest } from './middleware';
import { isBuyer, userAuthenticated } from './middleware/userAuthenticated';
import {
  createUserSchema,
  depositSchema,
  updateUserSchema,
} from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';

export default function (app: Express) {
  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // List users
  app.get('/api/users', userAuthenticated(), getUsersHandler);

  // Get a user
  app.get('/api/users/:userId', userAuthenticated(), getUserHandler);

  // Update a user
  app.patch(
    '/api/users/:userId',
    [userAuthenticated(), validateRequest(updateUserSchema)],
    updateUserHandler,
  );

  // Delete a user
  app.delete('/api/users/:userId', userAuthenticated(), deleteUserHandler);

  // Deposit
  app.patch(
    '/api/deposit',
    [userAuthenticated(isBuyer), validateRequest(depositSchema)],
    updateDepositHandler,
  );

  // Reset deposit
  app.patch('/api/reset', userAuthenticated(isBuyer), resetHandler);

  // Authenticate
  app.post(
    '/api/auth',
    validateRequest(createSessionSchema),
    createSessionHandler,
  );

  // Logout
  app.delete('/api/auth', userAuthenticated(), deleteSessionHandler);

  // Implement product model with amountAvailable, cost, productName and sellerId fields

  /* Implement CRUD for a product model (GET can be called by anyone, while POST,
    PUT and DELETE can be called only by the seller user who created the product) */

  /* Implement /buy endpoint (accepts productId, amount of products) so users
    with a “buyer” role can buy products with the money they’ve deposited. API
    should return total they’ve spent, products they’ve purchased and their
    change if there’s any (in 5, 10, 20, 50 and 100 cent coins) */
}
