// products.controller.ts
import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schema/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('mainImage'), FilesInterceptor('extraImages'))
  async create(@Body() createProductDto: CreateProductDto, @UploadedFile() mainImage, @UploadedFiles() extraImages): Promise<Product> {
    return this.productsService.create(createProductDto, mainImage, extraImages);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
