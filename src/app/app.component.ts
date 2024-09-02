import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './cart.service';
import { ProductResponse } from './products/types/product.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShopEasy';
  userName: string = '';
  userEmail: string = '';
  isUserMenuOpen = false;
  cartItems: ProductResponse[] = [];
  cartOpen: boolean = false;
  searchQuery: string='';
 

  constructor(
    private keycloakService: KeycloakService,
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initKeycloak();
    }
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  private async initKeycloak(): Promise<void> {
    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (isLoggedIn) {
        const token = await this.keycloakService.getToken();
        console.log('Token in AppComponent:', token);
        this.userName = (await this.keycloakService.loadUserProfile()).username ?? 'Unknown User';
      } else {
        await this.keycloakService.login();
      }
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
    }
  }

  logout(): void {
    this.keycloakService.logout();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
  search(): void {
    if (this.searchQuery) {
      this.router.navigate(['/products/card'], { queryParams: { q: this.searchQuery } });
    }
  }
}
