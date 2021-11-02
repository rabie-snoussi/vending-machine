import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';

import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router';
import { UserCreation, User } from 'shared/interfaces';
import { signUp } from 'actions/user.action';
import { PATHS, BUYER, SELLER } from 'shared/constants';
import locale from 'shared/locale.json';

interface SignUpProps extends RouteComponentProps {
  createUser: Function;
  user: User;
}

const Signup: React.FC<SignUpProps> = ({ createUser, history, user }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: UserCreation) => {
    createUser(data);
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
          display: 'grid',
          maxWidth: '300px',
          padding: '30px 50px',
          flexGrow: 1,
        }}
        raised
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <TextField
              required
              type="password"
              label={locale.passwordConfirmation}
              variant="standard"
              size="small"
              sx={{ width: '100%' }}
              {...register('passwordConfirmation')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <FormControl required fullWidth size="small">
              <RadioGroup aria-label="role" row>
                <FormControlLabel
                  value={BUYER}
                  control={<Radio />}
                  label={locale.buyer}
                  {...register('role')}
                />
                <FormControlLabel
                  value={SELLER}
                  control={<Radio />}
                  label={locale.seller}
                  {...register('role')}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <Link href={PATHS.SIGNIN}>{locale.hasAccount}</Link>
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <Button type="submit" sx={{ width: '100%' }} variant="contained">
              {locale.signUp}
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
  createUser: (data: UserCreation) => dispatch(signUp(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
