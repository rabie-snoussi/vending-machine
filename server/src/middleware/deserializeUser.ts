import get from 'lodash/get';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';
import { findUser } from '../service/user.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = get(req, 'cookies.accessToken');

  const refreshToken = get(req, 'cookies.refreshToken');

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  const userId = get(decoded, 'userId');
  const user = await findUser({ _id: userId });

  if (decoded && user) {
    Object.defineProperty(req, 'user', {
      value: user,
    });

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      const { decoded } = decode(newAccessToken);

      const userId = get(decoded, 'userId');
      const user = await findUser({ _id: userId });

      Object.defineProperty(req, 'user', {
        value: user,
      });
    }

    return next();
  }
  return next();
};

export default deserializeUser;
