import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import log from '../logger';

const validate =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
      );

      return next();
    } catch (e: any) {
      log.error(e);
      return res.status(400).send(e.message);
    }
  };

export default validate;
