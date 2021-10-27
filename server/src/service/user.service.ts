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

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(input.password, salt);

    return await User.create({ ...input, password: hash });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

export async function validatePassword({
  username,
  password,
}: {
  username: UserDocument['username'];
  password: string;
}) {
  const user = await User.findOne({ username });

  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function getUsers() {
  return User.find({}).lean();
}

export async function findAndUpdate(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions,
) {
  return User.findOneAndUpdate(query, update, options).lean();
}
