// products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createProductDto: CreateProductDto, mainImage: Express.Multer.File, extraImages: Express.Multer.File[]): Promise<Product> {
    createProductDto.mainImage = await this.fileUploadService.upload(mainImage);
    createProductDto.extraImages = await Promise.all(extraImages.map(file => this.fileUploadService.upload(file)));
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
