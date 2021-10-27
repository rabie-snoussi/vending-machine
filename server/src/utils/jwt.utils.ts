import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get('privateKey') as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { expired: false, decoded };
  } catch (e: any) {
    return {
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
