/* eslint-disable no-undef, dot-notation */
import setCookie from 'set-cookie-parser';
import request from 'supertest';
import config from 'config';
import jwt from 'jsonwebtoken';
import { deleteUser, createUser, findUser } from './service/user.service';
import { getOneSession } from './service/session.service';
import server from '../src/app';

const privateKey = config.get('privateKey') as string;

const ROLES = { BUYER: 'buyer', SELLER: 'seller' };

const USER_CREDS = { username: 'usertest', password: 'Test123123' };
const USER_INFO = {
  ...USER_CREDS,
  passwordConfirmation: USER_CREDS.password,
  role: ROLES.BUYER,
};

describe('POST /api/users', () => {
  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should return the created user', async () => {
    await request(server)
      .post('/api/users')
      .send(USER_INFO)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            username: expect.stringMatching(USER_INFO.username),
            role: expect.stringMatching(USER_INFO.role),
            deposit: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        );
      });
  });

  it('Should send 409 status code when trying to create a user with an existing username', async () => {
    await createUser(USER_INFO);

    await request(server).post('/api/users').send(USER_INFO).expect(409);
  });

  it("Should send 400 status code when passwords doesn't match", async () => {
    await request(server)
      .post('/api/users')
      .send({ ...USER_INFO, passwordConfirmation: 'wrongPassword' })
      .expect(400);
  });
});

describe('POST /api/auth', () => {
  beforeEach(() => createUser(USER_INFO));

  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should send cookies', async () => {
    await request(server)
      .post('/api/auth')
      .send(USER_CREDS)
      .expect(200)
      .then((res) => {
        const cookies = setCookie.parse(res, { map: true });
        expect(cookies['accessToken']).toBeTruthy();
        expect(cookies['refreshToken']).toBeTruthy();
      });
  });

  it('Should send 401 status code when password is wrong', async () => {
    await request(server)
      .post('/api/auth')
      .send({ username: 'buyer', password: 'wrongPassword' })
      .expect(401);
  });
});

describe('DELETE /api/auth', () => {
  beforeEach(() => createUser(USER_INFO));

  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should delete session', async () => {
    const signInResponse = await request(server)
      .post('/api/auth')
      .send(USER_CREDS);

    const cookies = signInResponse.header['set-cookie'];

    const parsedCookies = setCookie.parse(signInResponse, { map: true });

    const decodedRefreshToken = jwt.verify(
      parsedCookies.refreshToken.value,
      privateKey,
    );

    await request(server)
      .delete('/api/auth')
      .send()
      .set('Cookie', cookies)
      .expect(200);

    const session = await getOneSession({ _id: decodedRefreshToken._id });

    expect(session).toBeFalsy();
  });
});

describe('GET /api/users/:id', () => {
  beforeEach(() => createUser(USER_INFO));

  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should send user when tokens sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    const signInResponse = await request(server)
      .post('/api/auth')
      .send(USER_CREDS);

    const cookies = signInResponse.header['set-cookie'];

    await request(server)
      .get(`/api/users/${user._id}`)
      .send()
      .set('Cookie', cookies)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            username: expect.stringMatching(USER_INFO.username),
            role: expect.stringMatching(USER_INFO.role),
            deposit: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        );
      });
  });

  it('Should send 403 status code when no token sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    await request(server).get(`/api/users/${user._id}`).send().expect(403);
  });
});

describe('PATCH /api/users/:id', () => {
  beforeEach(() => createUser(USER_INFO));

  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should send updated user when tokens sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    const signInResponse = await request(server)
      .post('/api/auth')
      .send(USER_CREDS);

    const cookies = signInResponse.header['set-cookie'];

    await request(server)
      .patch(`/api/users/${user._id}`)
      .send({ ...USER_INFO, role: ROLES.SELLER })
      .set('Cookie', cookies)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            username: expect.stringMatching(USER_INFO.username),
            role: expect.stringMatching(ROLES.SELLER),
            deposit: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        );
      });
  });

  it('Should send 403 status code when updating user when no token sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    await request(server)
      .patch(`/api/users/${user._id}`)
      .send({ ...USER_INFO, role: ROLES.SELLER })
      .expect(403);
  });
});

describe('DELETE /api/users/:id', () => {
  beforeEach(() => createUser(USER_INFO));

  afterEach(() => deleteUser({ username: USER_CREDS.username }));

  it('Should delete user when tokens sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    const signInResponse = await request(server)
      .post('/api/auth')
      .send(USER_CREDS);

    const cookies = signInResponse.header['set-cookie'];

    await request(server)
      .delete(`/api/users/${user._id}`)
      .send({ ...USER_INFO, role: ROLES.SELLER })
      .set('Cookie', cookies)
      .expect(200);

    const deletedUser = await findUser({ username: USER_CREDS.username });

    expect(deletedUser).toBeFalsy();
  });

  it('Should send 403 status code when deleting user when no token sent', async () => {
    const user = await findUser({ username: USER_CREDS.username });

    await request(server)
      .patch(`/api/users/${user._id}`)
      .send({ ...USER_INFO, role: ROLES.SELLER })
      .expect(403);
  });
});
