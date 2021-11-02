import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface ProductDocument extends mongoose.Document {
  productName: string;
  sellerId: UserDocument['_id'];
  amountAvailable: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amountAvailable: { type: Number, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;
