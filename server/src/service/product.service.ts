import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import Product, { ProductDocument } from '../model/product.model';

export const createProduct = async (
  input: DocumentDefinition<ProductDocument>,
) => {
  try {
    return await Product.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findProducts = async (query: FilterQuery<ProductDocument>) => {
  try {
    return await Product.find(query).lean();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findProduct = async (query: FilterQuery<ProductDocument>) => {
  try {
    return await Product.findOne(query).lean();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findAndUpdate = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options?: QueryOptions,
) => {
  try {
    return await Product.findOneAndUpdate(query, update, options).lean();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  try {
    return await Product.deleteOne(query);
  } catch (e: any) {
    throw new Error(e);
  }
};
