import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addProduct as addAction } from 'actions/product.action';
import { ProductCreation as CreationInterface } from 'shared/interfaces';
import locale from 'shared/locale.json';

interface Props {
  onClose: Function;
  addProduct: Function;
}

const ProductCreation: React.FC<Props> = ({
  onClose,
  addProduct,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: CreationInterface) => {
    addProduct(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ padding: '0 20px' }}>
        <Box>
          <Box sx={{ padding: '10px 0', width: '100%' }}>
            <Typography variant="body1" component="div">
              {locale.productName}
            </Typography>
            <TextField
              required
              sx={{ width: '100%' }}
              variant="standard"
              {...register('productName')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <Typography variant="body1" component="div">
              {locale.amountAvailable}
            </Typography>
            <Input
              required
              type="number"
              sx={{ width: '100%' }}
              {...register('amountAvailable')}
            />
          </Box>

          <Box sx={{ padding: '10px 0' }}>
            <Typography variant="body1" component="div">
              {locale.cost}
            </Typography>
            <Input
              required
              type="number"
              sx={{ width: '100%' }}
              {...register('cost')}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
            }}
          >
            <Button onClick={() => onClose()}>{locale.close}</Button>
            <Button type="submit">
              {locale.addProduct}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  addProduct: (data: CreationInterface) => dispatch(addAction(data)),
});

export default connect(null, mapDispatchToProps)(ProductCreation);
