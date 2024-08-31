import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from '../types/product.model';
import { CartService } from '../../cart.service';
import { ApiService } from '../../services/api.services.ts.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService  // Inject ApiService to fetch product details
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductById(productId);
  }

  loadProductById(id: number): void {
    this.apiService.get(`http://localhost:8082/products/${id}`).then(response$ => {
      response$.subscribe(
        (product: ProductResponse) => {
          this.product = product;
        },
        error => {
          console.error('Failed to load product details', error);
        }
      );
    });
  }

  addToCart(product: ProductResponse): void {
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
