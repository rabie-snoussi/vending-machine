import { Request, Response } from 'express';
import get from 'lodash/get';
import {
  createProduct,
  findProducts,
  findProduct,
  findAndUpdate,
  deleteProduct,
} from '../service/product.service';
import log from '../logger';

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const product = req.body;

    const createdProduct = await createProduct({
      ...product,
      sellerId: userId,
    });
    return res.send(createdProduct.toJSON());
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await findProducts({});
    return res.send(products);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const getProductHandler = async (req: Request, res: Response) => {
  try {
    const productId = get(req, 'params.productId');
    const product = await findProduct({ _id: productId });
    return res.send(product);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const productId = get(req, 'params.productId');
    const update = req.body;
    const product = await findProduct({ _id: productId });
    const sellerId = get(product, 'sellerId');

    if (userId !== String(sellerId)) return res.sendStatus(403);

    const updatedProduct = await findAndUpdate({ _id: productId }, update, {
      new: true,
    });
    return res.send(updatedProduct);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const userId = get(req, 'user._id');
    const productId = get(req, 'params.productId');
    const product = await findProduct({ _id: productId });
    const sellerId = get(product, 'sellerId');

    if (userId !== String(sellerId)) return res.sendStatus(403);

    await deleteProduct({ _id: productId });

    return res.sendStatus(200);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
};
