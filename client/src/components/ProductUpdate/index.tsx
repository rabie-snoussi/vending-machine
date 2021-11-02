import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  resetProduct as resetAction,
  updateProduct as editAction,
  deleteProduct as deleteAction,
} from 'actions/product.action';
import {
  Product,
  ProductCreation as CreationInterface,
  ProductUpdate as UpdateInterface,
} from 'shared/interfaces';
import locale from 'shared/locale.json';

interface Props {
  onClose: Function;
  editProduct: Function;
  product: Product;
  resetProduct: Function;
  deleteProduct: Function;
}

const ProductUpdate: React.FC<Props> = ({
  onClose: closeModal,
  editProduct,
  product,
  resetProduct,
  deleteProduct,
}) => {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data: CreationInterface) => {
    editProduct({ productId: product._id, data });
  };

  const onClose = () => {
    resetProduct();
    closeModal();
  };

  const onDelete = () => {
    deleteProduct(product);
    onClose();
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
              value={watch('productName', product.productName)}
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
              value={watch('amountAvailable', product.amountAvailable)}
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
              value={watch('cost', product.cost)}
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
            <Button type="submit">{locale.editProduct}</Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 0',
            }}
          >
            <Button
              onClick={() => onDelete()}
              variant="contained"
              sx={{ background: 'red', '&:hover': { background: 'red' } }}
            >
              {locale.deleteProduct}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

const mapStateToProps = (state: { product: Product }) => {
  const { product } = state;
  return { product };
};

const mapDispatchToProps = (dispatch: Function) => ({
  editProduct: ({
    productId,
    data,
  }: {
    productId: string;
    data: UpdateInterface;
  }) => dispatch(editAction({ productId, data })),
  resetProduct: () => dispatch(resetAction()),
  deleteProduct: (product: Product) => dispatch(deleteAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
