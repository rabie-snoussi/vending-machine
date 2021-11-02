/* eslint-disable no-undef */
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import ProductTable from '.';

const mockStore = configureStore([]);

const products = [
  {
    _id: 'product1',
    productName: 'Soda',
    cost: 5,
    amountAvailable: 3,
    sellerId: 'seller1',
    createdAt: '2021-05-18T16:00:00Z',
    updatedAt: '2021-05-18T16:00:00Z',
  },
  {
    _id: 'product2',
    productName: 'Potato chips',
    cost: 15,
    amountAvailable: 0,
    sellerId: 'seller2',
    createdAt: '2021-05-18T16:00:00Z',
    updatedAt: '2021-05-18T16:00:00Z',
  },
  {
    _id: 'product3',
    productName: 'Biscuit',
    cost: 65,
    amountAvailable: 10,
    sellerId: 'seller2',
    createdAt: '2021-05-18T16:00:00Z',
    updatedAt: '2021-05-18T16:00:00Z',
  },
];

const sellerId = 'seller1';

const isOwner = (id) => id === sellerId;

const onPurchase = jest.fn(() => {});

const onEditProduct = jest.fn(() => {});

describe('Product Table', () => {
  it('Should render', () => {
    const store = mockStore({});

    const component = render(
      <Provider store={store}>
        <ProductTable />
      </Provider>,
    );
    expect(component).toBeTruthy();
  });

  it('Should render items', async () => {
    const store = mockStore({
      products,
    });

    const component = render(
      <Provider store={store}>
        <ProductTable />
      </Provider>,
    );

    const childrenValues = await component
      .queryAllByTestId('row')
      ?.map((row) => ({
        productName: row.querySelector('td[data-testid=productName]')
          ?.innerHTML,
        cost: Number(row.querySelector('td[data-testid=cost]')?.innerHTML),
        amountAvailable: Number(
          row.querySelector('td[data-testid=amountAvailable]')?.innerHTML,
        ),
      }));

    const formatedProducts = products.map(
      ({ productName, cost, amountAvailable }) => ({
        productName,
        cost,
        amountAvailable,
      }),
    );

    expect(childrenValues).toEqual(formatedProducts);
  });

  it('Should display purchase buttons if isBuyer = true', async () => {
    const store = mockStore({
      products,
    });

    const component = render(
      <Provider store={store}>
        <ProductTable isBuyer />
      </Provider>,
    );

    const purchaseBtns = await component
      .queryAllByTestId('row')
      ?.map((row) =>
        row.querySelector(
          'td[data-testid=action] > button[data-testid=purchaseBtn]',
        ),
      );

    expect(purchaseBtns?.length).toBe(3);
  });

  it('Should fire onPurchase() button on click if availableAmount > 0', async () => {
    const store = mockStore({
      products,
    });

    render(
      <Provider store={store}>
        <ProductTable isBuyer onPurchase={onPurchase} />
      </Provider>,
    );

    const purchaseBtns = screen.queryAllByTestId('purchaseBtn');

    fireEvent.click(purchaseBtns[0]);

    expect(onPurchase).toHaveBeenCalledTimes(1);
  });

  it('Should not fire onPurchase() button on click if availableAmount = 0', async () => {
    const store = mockStore({
      products,
    });

    render(
      <Provider store={store}>
        <ProductTable isBuyer onPurchase={onPurchase} />
      </Provider>,
    );

    const purchaseBtns = screen.queryAllByTestId('purchaseBtn');

    fireEvent.click(purchaseBtns[1]);

    expect(onPurchase).toHaveBeenCalledTimes(0);
  });

  it('Should display edit buttons if isSeller = true', async () => {
    const store = mockStore({
      products,
    });

    const component = render(
      <Provider store={store}>
        <ProductTable isSeller isOwner={isOwner} />
      </Provider>,
    );

    const editProductBtns = await component
      .queryAllByTestId('row')
      ?.map((row) =>
        row.querySelector(
          'td[data-testid=action] button[data-testid=editProductBtn]',
        ),
      );

    expect(editProductBtns?.length).toBe(3);
  });

  it('Should fire onEditProduct() button on click if isOwner = true', async () => {
    const store = mockStore({
      products,
    });

    render(
      <Provider store={store}>
        <ProductTable
          isSeller
          isOwner={isOwner}
          onEditProduct={onEditProduct}
        />
      </Provider>,
    );

    const editBtns = screen.queryAllByTestId('editProductBtn');

    fireEvent.click(editBtns[0]);

    expect(onEditProduct).toHaveBeenCalledTimes(1);
  });

  it('Should not fire onEditProduct() button on click if isOwner = false', async () => {
    const store = mockStore({
      products,
    });

    render(
      <Provider store={store}>
        <ProductTable
          isSeller
          isOwner={isOwner}
          onEditProduct={onEditProduct}
        />
      </Provider>,
    );

    const editBtns = screen.queryAllByTestId('editProductBtn');

    fireEvent.click(editBtns[1]);

    expect(onEditProduct).toHaveBeenCalledTimes(0);
  });
});
