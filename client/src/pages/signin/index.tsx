import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';

import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signIn } from 'actions/user.action';
import { PATHS } from 'shared/constants';
import isEmpty from 'lodash/isEmpty';
import { User, Credentials } from 'shared/interfaces';
import locale from 'shared/locale.json';

interface SigninProps extends RouteComponentProps {
  login: Function;
  user: User;
}

const Signin: React.FC<SigninProps> = ({ history, login, user }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (credentials: Credentials) => {
    login(credentials);
  };

  if (!isEmpty(user)) history.push(PATHS.HOME);

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
            <AccountCircle
              sx={{ fill: 'lightgrey', width: '90px', height: '90px' }}
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
            <Link href={PATHS.SIGNUP}>{locale.noAccountSignUp}</Link>
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

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  login: (data: Credentials) => dispatch(signIn(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
