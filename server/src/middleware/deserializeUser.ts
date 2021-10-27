import get from 'lodash/get';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';
import { reIssueAccessToken, getOneSession } from '../service/session.service';
import { findUser } from '../service/user.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    '',
  );

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  const sessionId = get(decoded, 'session');
  const session = await getOneSession({ _id: sessionId });

  const userId = get(decoded, '_id');
  const user = await findUser({ _id: userId });

  if (decoded && session && user) {
    Object.defineProperty(req, 'user', {
      value: decoded,
    });

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      const { decoded } = decode(newAccessToken);

      Object.defineProperty(req, 'user', {
        value: decoded,
      });
    }

    return next();
  }
  return next();
};

export default deserializeUser;
