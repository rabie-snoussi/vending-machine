import { LeanDocument, FilterQuery } from 'mongoose';
import get from 'lodash/get';
import config from 'config';
import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { sign, decode } from '../utils/jwt.utils';
import { findUser } from '../service/user.service';

export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ userId, userAgent });
  return session.toJSON();
};

export const createAccessToken = async ({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>;
  session: SessionDocument | LeanDocument<SessionDocument>;
}) => {
  const accessToken = sign(
    { ...user, sessionId: session._id },
    { expiresIn: config.get('accessTokenTtl') },
  );

  return accessToken;
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  const session = await Session.findById(get(decoded, '_id'));

  if (!session) return false;

  const user = await findUser({ _id: session.userId });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
};

export const getOneSession = async (query: FilterQuery<SessionDocument>) =>
  Session.findOne(query).lean();

export const deleteSession = async (query: FilterQuery<SessionDocument>) =>
  Session.deleteOne(query);
