import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { ProductResponse } from '../products/types/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],  // Make sure CommonModule is included here
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: ProductResponse[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}