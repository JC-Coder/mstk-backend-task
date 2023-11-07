import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(payload: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(payload);
  }

  async updateProduct(id: string, payload: UpdateProductDto): Promise<void> {
    await this.productModel.updateOne({ _id: id }, payload);
  }

  async getProductById(id: string): Promise<ProductDocument> {
    return await this.productModel.findOne({ _id: id });
  }

  async getAllProducts(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productModel.deleteOne({ _id: id });
  }
}
