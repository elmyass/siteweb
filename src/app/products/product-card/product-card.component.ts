import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from '../types/product.model';
import { CartService } from '../../cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements AfterViewInit {
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

  products: ProductResponse[] = [
    {
      id: 1,
      name: 'Luxora Serenity ',
      description: 'Indulge in the calming embrace of the Luxora Serenity Candle. Crafted with a soothing blend of lavender and chamomile, this candle is designed to bring tranquility and relaxation into your space. Encased in an elegant frosted glass jar, it adds a touch of sophistication to any room. Perfect for unwinding after a long day or enhancing your meditation practice.',
      price: 149.99,
      categoryQuality: 'High',
      imageUrl: 'https://i.pinimg.com/564x/35/37/06/353706f70be67a6cbf52ff28fd6bd12e.jpg'
    },
    {
      id: 2,
      name: 'Ethereal Silk Scarf',
      description: 'Elevate your style with the Ethereal Silk Scarf, a luxurious accessory that combines elegance and versatility. Made from 100% pure silk, this scarf features a delicate floral pattern in pastel shades, making it a perfect addition to both casual and formal outfits. Whether draped over your shoulders or tied around your neck, it adds a touch of sophistication to any ensemble.',
      price: 179.99,
      categoryQuality: 'Medium',
      imageUrl: 'https://i.pinimg.com/564x/05/75/1b/05751b74066805e3907805a1a08ef7f2.jpg'
    },
    {
      id: 3,
      name: 'Opulence Crystal Decanter',
      description: 'Showcase your finest spirits in style with the Opulence Crystal Decanter. Handcrafted from the highest quality lead-free crystal, this decanter is designed to exude luxury and sophistication. The sleek, modern design and intricately cut stopper make it a stunning centerpiece for your home bar. Ideal for special occasions or as a statement piece, the Opulence Crystal Decanter is the epitome of refined elegance.',
      price: 89.99,
      categoryQuality: 'Low',
      imageUrl: 'https://i.pinimg.com/236x/72/57/c2/7257c26f80a8d0389d65f6a4f4c702b5.jpg'
    },
    {
      id: 4,
      name: 'LovB Ferment Cream',
      description: 'Discover the secret to radiant, youthful skin with LovB Ferment Cream. This luxurious cream is enriched with oat kernel extract and a proprietary ferment blend that deeply nourishes and revitalizes your skin. The lightweight formula absorbs quickly, leaving your skin feeling soft, smooth, and hydrated. Ideal for all skin types, LovB Ferment Cream is your go-to solution for a glowing, healthy complexion.',
      price: 89.99,
      categoryQuality: 'Low',
      imageUrl: 'https://i.pinimg.com/564x/42/a3/ea/42a3eaae51294a319376935930454024.jpg'
    }
  ];

  filteredProducts: ProductResponse[] = [...this.products];
  filterVisible = false;

  constructor(
    private router: Router,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSliderLoop();
    }
  }

  startSliderLoop() {
    const sliderWrapper = document.querySelector('.slider-wrapper') as HTMLElement;
    
    if (sliderWrapper) {
      sliderWrapper.innerHTML += sliderWrapper.innerHTML; // Clone the existing images for a loop

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