import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';

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

  constructor(
    private keycloakService: KeycloakService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initKeycloak();
    }
  }

  private async initKeycloak(): Promise<void> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      try {
        const userProfile = await this.keycloakService.loadUserProfile();
        this.userName = userProfile.username ?? 'Unknown User';
        this.userEmail = userProfile.email ?? 'No Email';
        
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    } else {
      console.warn('User not logged in');
    }
  }

  logout(): void {
    this.keycloakService.logout();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
