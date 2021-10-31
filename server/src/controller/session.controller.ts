import { Request, Response } from 'express';
import get from 'lodash/get';
import config from 'config';
import { validatePassword } from '../service/user.service';
import {
  createAccessToken,
  createSession,
  deleteSession,
} from '../service/session.service';
import { sign } from '../utils/jwt.utils';

export const createSessionHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send('Invalid username or password');

  const session = await createSession(user._id, req.get('user-agent') || '');

  const accessToken = await createAccessToken({
    user,
  });

  const refreshToken = sign(
    { sessionId: session._id },
    {
      expiresIn: config.get('refreshTokenTtl'),
    },
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.send({ user });
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = get(req, 'user.sessionId');
  await deleteSession({ _id: sessionId });

  return res.sendStatus(200);
};
