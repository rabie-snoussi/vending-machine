import React, { useState } from 'react';
import { connect } from 'react-redux';
import { User } from 'shared/interfaces';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import {
  ProductAmount,
  Deposit,
  Modal,
  DepositButtons,
  ProductTable,
  AddProductButton,
  ProductCreation,
  ProductUpdate,
} from 'components';
import { MODALS } from 'shared/constants';
import { resetDeposit as resetAction } from 'actions/user.action';
import {
  onDeposit,
  onPurchase,
  onAddProduct,
  onEditProduct,
  onCloseModal,
  isBuyer,
  isOwner,
  isSeller,
} from './helper';

interface HomeProps {
  user: User;
  resetDeposit: Function;
}

const Home: React.FC<HomeProps> = ({
  user: { deposit, role, _id },
  resetDeposit,
}) => {
  const [modal, setModal] = useState<string>('');

  const modalDisplay = {
    [MODALS.DEPOSIT]: (
      <Modal>
        <Deposit onClose={onCloseModal(setModal)} />
      </Modal>
    ),
    [MODALS.AMOUNT]: (
      <Modal>
        <ProductAmount onClose={onCloseModal(setModal)} />
      </Modal>
    ),
    [MODALS.PRODUCT_CREATION]: (
      <Modal>
        <ProductCreation onClose={onCloseModal(setModal)} />
      </Modal>
    ),

    [MODALS.PRODUCT_EDITION]: (
      <Modal>
        <ProductUpdate onClose={onCloseModal(setModal)} />
      </Modal>
    ),
  };

  return (
    <Box sx={{ background: '#f5f5f5', height: '100%' }}>
      {modalDisplay[modal]}

      <Box sx={{ padding: '1em 0', display: 'flex', justifyContent: 'center' }}>
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isBuyer(role) && (
            <DepositButtons
              deposit={deposit}
              onDeposit={onDeposit(setModal)}
              onReset={resetDeposit}
            />
          )}

          {isSeller(role) && (
            <AddProductButton onAddProduct={onAddProduct(setModal)} />
          )}
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ProductTable
          onPurchase={onPurchase(setModal)}
          onEditProduct={onEditProduct(setModal)}
          isBuyer={isBuyer(role)}
          isSeller={isSeller(role)}
          isOwner={isOwner(_id)}
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: { user: User }) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch: Function) => ({
  resetDeposit: () => dispatch(resetAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
