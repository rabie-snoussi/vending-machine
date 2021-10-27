import { Request, Response } from 'express';
import { omit, get } from 'lodash';
import {
  createUser,
  getUsers,
  findUser,
  findAndUpdate,
} from '../service/user.service';
import log from '../logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getUsers();

    return res.send(users);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateDepositHandler(req: Request, res: Response) {
  try {
    const userId = get(req, 'user._id');
    const amount = get(req, 'body.amount');
    const user = await findUser({ _id: userId });
    const deposit = get(user, 'deposit', 0);
    const newDeposit = deposit + amount;

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await findAndUpdate(
      { _id: userId },
      { deposit: newDeposit },
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
