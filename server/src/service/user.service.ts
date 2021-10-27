import {
  DocumentDefinition,
  Error,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import omit from 'lodash/omit';
import bcrypt from 'bcrypt';
import config from 'config';
import User, { UserDocument } from '../model/user.model';

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(input.password, salt);

    return await User.create({ ...input, password: hash });
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) =>
  User.findOne(query).lean();

export const validatePassword = async ({
  username,
  password,
}: {
  username: UserDocument['username'];
  password: string;
}) => {
  const user = await User.findOne({ username });

  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
};

export const getUsers = async () => User.find({}).lean();

export const findAndUpdate = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions,
) => User.findOneAndUpdate(query, update, options).lean();

export const deleteUser = async (query: FilterQuery<UserDocument>) =>
  User.deleteOne(query);
