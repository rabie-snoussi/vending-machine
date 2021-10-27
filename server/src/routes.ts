import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  updateDepositHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from './controller/user.controller';
import {
  createSessionHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import { validateRequest, requiresUser } from './middleware';
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
  app.get('/api/users', requiresUser, getUsersHandler);

  // Get a user
  app.get('/api/users/:userId', requiresUser, getUserHandler);

  // Update a user
  app.patch(
    '/api/users/:userId',
    [requiresUser, validateRequest(updateUserSchema)],
    updateUserHandler,
  );

  // Delete a user
  app.delete('/api/users/:userId', requiresUser, deleteUserHandler);

  // Deposit
  app.patch(
    '/api/deposit',
    [requiresUser, validateRequest(depositSchema)],
    updateDepositHandler,
  );

  // Authenticate
  app.post(
    '/api/auth',
    validateRequest(createSessionSchema),
    createSessionHandler,
  );

  // Logout
  app.delete('/api/auth', requiresUser, deleteSessionHandler);
}
