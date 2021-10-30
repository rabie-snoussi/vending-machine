import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import get from 'lodash/get';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import { UserCreation } from 'shared/interfaces';
import { signUpRequest } from 'service/user.service';
import { PATHS } from 'shared/constants';
import locale from 'shared/locale.json';

const Signup = ({ history }: RouteComponentProps) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (informations: UserCreation) => {
    const response = signUpRequest(informations);

    toast.promise(response, {
      pending: locale.pendingRequest,
      success: locale.creationSuccess,
      error: {
        render({ data }: AxiosResponse) {
          const serverMessage = get(data, 'response.data');
          const errorMessage = get(data, 'message');
          return serverMessage || errorMessage;
        },
      },
    });

    response.then(() => {
      history.push(PATHS.SIGNIN);
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
              <RadioGroup {...register('role')}>
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label={locale.buyer}
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio />}
                  label={locale.seller}
                />
              </RadioGroup>
            </FormControl>
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

export default withRouter(Signup);
