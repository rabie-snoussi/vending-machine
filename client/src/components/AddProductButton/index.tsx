import Button from '@mui/material/Button';

import React from 'react';
import locale from 'shared/locale.json';

interface Props {
  onAddProduct: Function;
}

const AddProductButton: React.FC<Props> = ({ onAddProduct }) => (
  <Button variant="contained" onClick={() => onAddProduct()}>
    {locale.addProduct}
  </Button>
);

export default AddProductButton;
