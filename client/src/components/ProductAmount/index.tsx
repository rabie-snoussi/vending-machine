import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import locale from 'shared/locale.json';
import { Purchase, Product, PurchaseInfo } from 'shared/interfaces';
import {
  buyProduct,
  resetPurchaseInfo,
  resetProduct as resetProductAction,
} from 'actions/product.action';
import { Change } from 'components';

interface Props {
  onClose: Function;
  purchase: Function;
  product: Product;
  purchaseInfo: PurchaseInfo;
  resetPurchase: Function;
  resetProduct: Function;
}

const ProductAmount: React.FC<Props> = ({
  onClose: closeModal,
  purchase,
  product: { amountAvailable, _id },
  purchaseInfo,
  resetPurchase,
  resetProduct,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: { amount: string }) => {
    const amount = Number(data.amount);
    purchase({ productId: _id, amount });
  };

  const onClose = () => {
    resetPurchase();
    resetProduct();
    closeModal();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 500 }}>
          <Slider
            valueLabelDisplay="auto"
            max={amountAvailable}
            {...register('amount')}
          />
        </Box>

        <Box>
          {purchaseInfo?.totalCost && (
            <Box>
              <Typography variant="body1" component="div">
                {`${locale.totalCost}: ${purchaseInfo.totalCost}`}
              </Typography>
            </Box>
          )}

          {!isEmpty(purchaseInfo?.change) && (
            <Change change={purchaseInfo.change} />
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => onClose()}>{locale.close}</Button>
          <Button type="submit">{locale.purchase}</Button>
        </Box>
      </form>
    </Box>
  );
};

const mapStateToProps = (state: {
  product: Product;
  purchaseInfo: PurchaseInfo;
}) => {
  const { product, purchaseInfo } = state;
  return { product, purchaseInfo };
};

const mapDispatchToProps = (dispatch: Function) => ({
  purchase: (data: Purchase) => dispatch(buyProduct(data)),
  resetPurchase: () => dispatch(resetPurchaseInfo()),
  resetProduct: () => dispatch(resetProductAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAmount);
