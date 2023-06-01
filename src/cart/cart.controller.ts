import { Controller, Post, Delete, Put, Get, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addProduct(@Body() body) {
    const { userId, productId, quantity } = body;
    this.cartService.addProduct(userId, productId, quantity);
  }

  @Delete(':productId')
  removeProduct(@Param('productId') productId: string, @Body() body) {
    const { userId } = body;
    this.cartService.removeProduct(userId, productId);
  }

  @Put()
  updateProductQuantity(@Body() body) {
    const { userId, productId, quantity } = body;
    this.cartService.updateProductQuantity(userId, productId, quantity);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
}
