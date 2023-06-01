import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  private readonly cart = new Map(); // Replace this with a persistent data store in production

  constructor(private readonly productsService: ProductsService) {}

  async addProduct(userId: string, productId: string, quantity: number) {
    const product = await this.productsService.findOne(productId);
    // Verify product availability and other business rules here
    // Add product to user's cart in the data store
    const cartItem = this.cart.get(userId) || [];
    cartItem.push({ product, quantity });
    this.cart.set(userId, cartItem);
  }

  async removeProduct(userId: string, productId: string) {
    const cartItem = this.cart.get(userId);
    if (!cartItem) return;
    const index = cartItem.findIndex(item => item.product.id === productId);
    if (index > -1) {
      cartItem.splice(index, 1);
      this.cart.set(userId, cartItem);
    }
  }

  async updateProductQuantity(userId: string, productId: string, quantity: number) {
    const product = await this.productsService.findOne(productId);
    // Verify product availability and other business rules here
    // Update product quantity in user's cart in the data store
    const cartItem = this.cart.get(userId);
    if (!cartItem) return;
    const item = cartItem.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getCart(userId: string) {
    // Implementation depends on your data store.
    return this.cart.get(userId) || [];
  }
}
