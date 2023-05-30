// products.controller.ts
import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schema/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'extraImages', maxCount: 20 },
  ]))
  async create(
    @UploadedFiles() files,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { mainImage, extraImages } = files;
    return this.productsService.create(createProductDto, mainImage[0], extraImages);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
