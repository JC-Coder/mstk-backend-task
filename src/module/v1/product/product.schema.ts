import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
