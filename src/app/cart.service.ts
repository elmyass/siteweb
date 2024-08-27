import { Injectable } from '@angular/core';
import { ProductResponse } from './products/types/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ProductResponse[] = [];

  addToCart(product: ProductResponse): void {
    this.cartItems.push(product);
  }

  getCartItems(): ProductResponse[] {
    return this.cartItems;
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}