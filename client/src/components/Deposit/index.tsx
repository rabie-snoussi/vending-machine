import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import locale from 'shared/locale.json';
import { Deposit as DepositInterface } from 'shared/interfaces';
import { deposit as depositAction } from 'actions/user.action';
import { marks } from './helper';

interface Props {
  onClose: Function;
  deposit: Function;
}

const Deposit: React.FC<Props> = ({ onClose, deposit }) => {
  const { register, handleSubmit } = useForm();

  const valueLabelFormat = (value: number) => `${value} ${locale.cents}`;

  const onSubmit = (data: DepositInterface) => {
    const amount = Number(data.amount);

    deposit({ amount });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 500 }}>
          <Slider
            aria-label="Restricted values"
            defaultValue={5}
            valueLabelFormat={valueLabelFormat}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            {...register('amount')}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => onClose()}>{locale.close}</Button>
          <Button type="submit">{locale.deposit}</Button>
        </Box>
      </form>
    </Box>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  deposit: (data: DepositInterface) => dispatch(depositAction(data)),
});

export default connect(null, mapDispatchToProps)(Deposit);
