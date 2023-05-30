// products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUploadService } from '../file-upload/file-upload.service';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    mainImage?: Express.Multer.File,
    extraImages?: Express.Multer.File[]
  ): Promise<Product> {
    if (mainImage) {
      const uploadedMainImage = await this.fileUploadService.upload(mainImage);
      createProductDto.mainImage = uploadedMainImage;
    }
    if (extraImages) {
      const uploadedExtraImages = await Promise.all(
        extraImages.map((file) => this.fileUploadService.upload(file))
      );
      createProductDto.extraImages = uploadedExtraImages;
    }

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({_id: id}).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }
}

