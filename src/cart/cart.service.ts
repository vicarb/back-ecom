import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  private readonly cart = new Map(); // Replace this with a persistent data store in production

  constructor(private readonly productsService: ProductsService) {}

  async addProduct(userId: string, productId: string, quantity: number) {
    const product = await this.productsService.findOne(productId);
    const cartItem = this.cart.get(userId) || [];
    const itemIndex = cartItem.findIndex(item => item.product.id === productId);
    if (itemIndex > -1) {
      // Product already exists in the cart, set the quantity
      cartItem[itemIndex].quantity = Number(quantity);
    } else {
      // Product does not exist in the cart, add it
      cartItem.push({ product, quantity: Number(quantity) });
    }
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
