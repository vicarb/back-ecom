import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  mainImage: string;

  @Prop({ required: true, type: [String] })
  extraImages: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
