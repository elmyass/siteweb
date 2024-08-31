import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from '../types/product.model';
import { CartService } from '../../cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../services/api.services.ts.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements AfterViewInit, OnInit {

  // Define the sliderProducts array
  sliderProducts = [
    {
      imageUrl: 'https://i.pinimg.com/564x/81/56/46/815646a354574ab9135d4ae9dcbf2c5d.jpg',
      hoverText: 'Welcome to Natural Glow, where beauty meets nature.'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/9e/4a/2d/9e4a2dcd1f130d97220cfcfe2d3878d7.jpg'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/2f/e3/b6/2fe3b64642fdf54e95ccc7a0c7b0b73e.jpg',
      hoverText: 'We’re here to help! Whether you have questions about our products or need skincare advice'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/b0/d2/b7/b0d2b7096856f2124c9413aa75aead1e.jpg'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/60/b3/79/60b379d18c0296f2f0ac256c29f7c7a7.jpg'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/a0/a3/81/a0a381e5573d8fcf7bd0b17ae9711afb.jpg'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/e6/3c/ec/e63cecd2f520763ba0e9e2f96ff118f8.jpg'
    },
    {
      imageUrl: 'https://i.pinimg.com/564x/fe/d7/18/fed71827b233bd32bd7c5d920282e37c.jpg'
    }
  ];

  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  filterVisible = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService, 
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSliderLoop();
    }
  }

  loadProducts(): void {
    this.apiService.get('http://localhost:8082/products').then(response$ => {
      response$.subscribe(products => {
        this.products = products;
        this.filteredProducts = [...this.products]; 
      }, error => {
        console.error('Failed to load products', error);
      });
    });
  }

  refreshProducts(): void {
    this.loadProducts();
  }

  startSliderLoop() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    
    if (sliderWrapper) {
      sliderWrapper.innerHTML += sliderWrapper.innerHTML; 

      sliderWrapper.addEventListener('animationiteration', () => {
        sliderWrapper.classList.add('no-transition');
        sliderWrapper.style.transform = 'translateX(0)';
        requestAnimationFrame(() => {
          sliderWrapper.classList.remove('no-transition');
        });
      });
    }
  }

  toggleFilter(): void {
    this.filterVisible = !this.filterVisible;
  }

  applyFilter(category: string): void {
    if (category === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => product.categoryQuality === category);
    }
    this.filterVisible = false;
  }

  addToCart(product: ProductResponse): void {
    this.cartService.addToCart(product);
  }

  viewProductDetails(product: ProductResponse): void {
    this.router.navigate(['/products/details', product.id]);
  }
}
