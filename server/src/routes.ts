import { Express } from 'express';

import {
  createUserHandler,
  getUsersHandler,
  updateDepositHandler,
} from './controller/user.controller';
import {
  createSessionHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import { validateRequest, requiresUser } from './middleware';
import { createUserSchema, depositSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';

export default function (app: Express) {
  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // List users
  app.get('/api/users', requiresUser, getUsersHandler);

  // Deposit
  app.patch(
    '/api/deposit',
    validateRequest(depositSchema),
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
