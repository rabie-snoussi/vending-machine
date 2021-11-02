import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { User, UserUpdate } from 'shared/interfaces';
import {
  updateUser,
  deleteUser as deleteAction,
  resetUser as resetAction,
} from 'actions/user.action';
import { BUYER, SELLER } from 'shared/constants';
import locale from 'shared/locale.json';

interface Props {
  editUser: Function;
  user: User;
  deleteUser: Function;
  resetUser: Function;
}

const Profile: React.FC<Props> = ({
  editUser,
  user,
  deleteUser,
  resetUser,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: UserUpdate) => {
    editUser({ userId: user._id, data });
  };

  const onDelete = (data: User) => {
    deleteUser(data);
    resetUser();
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
              defaultValue={user.username}
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
              <RadioGroup row defaultValue={user.role}>
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

          <Box sx={{ padding: '5px 0' }}>
            <Button type="submit" sx={{ width: '100%' }} variant="contained">
              {locale.update}
            </Button>
          </Box>

          <Box sx={{ padding: '5px 0' }}>
            <Button
              sx={{
                width: '100%',
                background: 'red',
                '&:hover': { background: 'red' },
              }}
              variant="contained"
              onClick={() => onDelete(user)}
            >
              {locale.delete}
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
  editUser: ({ userId, data }: { userId: string; data: UserUpdate }) =>
    dispatch(updateUser({ userId, data })),
  deleteUser: (data: User) => dispatch(deleteAction(data)),
  resetUser: () => dispatch(resetAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
