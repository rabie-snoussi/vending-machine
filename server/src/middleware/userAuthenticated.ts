import { Request, Response, NextFunction } from 'express';
import get from 'lodash/get';

export const isBuyer = (userRole: String) => userRole === 'buyer';

export const isSeller = (userRole: String) => userRole === 'seller';

export const userAuthenticated =
  (userRoleCheck?: Function) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = get(req, 'user');
      if (!user) return res.sendStatus(403);
      const userRole = get(req, 'user.role');
      if (userRoleCheck && !userRoleCheck(userRole)) return res.sendStatus(403);
      return next();
    };
