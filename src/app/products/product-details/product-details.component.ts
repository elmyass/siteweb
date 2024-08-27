import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../types/product.model';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductResponse | undefined;

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.getProductById(productId);
  }

  getProductById(id: number): ProductResponse | undefined {
    const products: ProductResponse[] = [
      {
        id: 1,
        name: 'Nike Air Max',
        description: 'Experience ultimate comfort and style with these iconic Nike Air Max sneakers.',
        price: 149.99,
        categoryQuality: 'High',
        imageUrl: 'https://i.pinimg.com/564x/35/37/06/353706f70be67a6cbf52ff28fd6bd12e.jpg'
      },
      {
        id: 2,
        name: 'Adidas UltraBoost',
        description: 'Unparalleled cushioning for the best running experience.',
        price: 179.99,
        categoryQuality: 'Medium',
        imageUrl: 'https://i.pinimg.com/564x/05/75/1b/05751b74066805e3907805a1a08ef7f2.jpg'
      },
     
    ];

    return products.find(product => product.id === id);
  }

  addToCart(product: ProductResponse): void {
    this.cartService.addToCart(product);
   
  }
}
