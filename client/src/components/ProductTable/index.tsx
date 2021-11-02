import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Edit from '@mui/icons-material/Edit';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Product } from 'shared/interfaces';
import {
  setProduct,
  getProducts as getProductsAction,
} from 'actions/product.action';
import locale from 'shared/locale.json';

interface Props {
  getProducts: Function;
  products: [Product];
  onPurchase: Function;
  onEditProduct: Function;
  storeProduct: Function;
  isBuyer: boolean;
  isSeller: boolean;
  isOwner: Function;
}

const ProductTable: React.FC<Props> = ({
  products,
  onPurchase,
  onEditProduct,
  storeProduct,
  isBuyer,
  isSeller,
  isOwner,
  getProducts,
}) => {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <TableContainer sx={{ maxWidth: 600 }} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">{locale.productName}</TableCell>
            <TableCell align="center">{locale.amountAvailable}</TableCell>
            <TableCell align="center">
              {`${locale.cost} (${locale.cents.toLowerCase()})`}
            </TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              data-testid="row"
            >
              <TableCell data-testid="productName" align="center">
                {product.productName}
              </TableCell>
              <TableCell data-testid="amountAvailable" align="center">
                {product.amountAvailable}
              </TableCell>
              <TableCell data-testid="cost" align="center">
                {product.cost}
              </TableCell>
              <TableCell data-testid="action" align="center">
                {isBuyer && (
                  <Button
                    data-testid="purchaseBtn"
                    variant="contained"
                    disabled={!product.amountAvailable}
                    sx={{
                      width: '100%',
                      background: 'green',
                      justifyContent: 'space-around',
                      '&:hover': { background: 'green' },
                    }}
                    onClick={() => {
                      onPurchase();
                      storeProduct(product);
                    }}
                  >
                    <ShoppingCart />
                  </Button>
                )}

                {isSeller && (
                  <Button
                    data-testid="editProductBtn"
                    variant="contained"
                    disabled={!isOwner(product.sellerId)}
                    sx={{
                      width: '100%',
                      background: 'orange',
                      justifyContent: 'space-around',
                      '&:hover': { background: 'orange' },
                    }}
                    onClick={() => {
                      onEditProduct();
                      storeProduct(product);
                    }}
                  >
                    <Edit />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: { products: [Product]; product: Product }) => {
  const { products, product } = state;
  return { products, product };
};

const mapDispatchToProps = (dispatch: Function) => ({
  storeProduct: (data: Product) => dispatch(setProduct(data)),
  getProducts: () => dispatch(getProductsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
