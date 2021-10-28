import { Request, Response } from 'express';
import get from 'lodash/get';
import omit from 'lodash/omit';
import {
  createUser,
  getUsers,
  findUser,
  findAndUpdate,
  deleteUser,
} from '../service/user.service';
import log from '../logger';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.send(users);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateDepositHandler = async (req: Request, res: Response) => {
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
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'params.userId');
    const user = await findUser({ _id: userId });

    return res.send(omit(user, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const loggedUserId = get(req, 'user._id');
    const userId = get(req, 'params.userId');
    const update = req.body;

    if (loggedUserId !== userId) return res.sendStatus(403);

    const updatedUser = await findAndUpdate({ _id: userId }, update, {
      new: true,
    });

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const loggedUserId = get(req, 'user._id');
    const userId = get(req, 'params.userId');

    if (loggedUserId !== userId) return res.sendStatus(403);

    await deleteUser({ _id: userId });

    return res.sendStatus(200);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const resetHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');

    const updatedUser = await findAndUpdate(
      { _id: userId },
      { deposit: 0 },
      { new: true },
    );

    return res.send(omit(updatedUser, 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
