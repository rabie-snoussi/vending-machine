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

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send('Invalid username or password');

  const session = await createSession(user._id, req.get('user-agent') || '');

  const accessToken = createAccessToken({
    user,
    session,
  });

  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'),
  });

  return res.send({ accessToken, refreshToken });
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = get(req, 'user.session');
  await deleteSession({ _id: sessionId });

  return res.sendStatus(200);
}
