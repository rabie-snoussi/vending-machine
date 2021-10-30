import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AxiosResponse } from 'axios';
import { withRouter } from 'react-router';
import { setUser } from 'actions/user.action';
import { signInRequest } from 'service/user.service';
import { PATHS } from 'shared/constants';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { UserInterface, Credentials } from 'shared/interfaces';
import locale from 'shared/locale.json';

interface SigninProps extends RouteComponentProps {
  storeUser: Function;
}

const Signin: React.FC<SigninProps> = ({ history, storeUser }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (credentials: Credentials) => {
    const response = signInRequest(credentials);

    toast.promise(response, {
      pending: locale.pendingRequest,
      success: locale.welcome,
      error: {
        render({ data }: AxiosResponse) {
          const serverMessage = get(data, 'response.data');
          const errorMessage = get(data, 'message');
          return serverMessage || errorMessage;
        },
      },
    });

    response.then((data) => {
      const { _id, username, role, deposit } = get(
        data,
        'data.user',
      ) as UserInterface;

      const user = { _id, username, role, deposit };

      storeUser(user);

      history.push(PATHS.HOME);
    });
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          maxWidth: '300px',
          padding: '30px 50px',
          flexGrow: 1,
        }}
        raised
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px 0',
            }}
          >
            <Avatar
              sx={{ height: '75px', width: '75px' }}
              src="assets/default-avatar.png"
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              required
              label={locale.username}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              {...register('username')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <TextField
              required
              label={locale.password}
              type="password"
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              {...register('password')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <Link href="/signup">{locale.noAccountSignUp}</Link>
          </Box>

          <Box sx={{ padding: '40px 0 0 0' }}>
            <Button sx={{ width: '100%' }} variant="contained" type="submit">
              {locale.signIn}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state: { user: UserInterface }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  storeUser: (data: UserInterface) => dispatch(setUser(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
