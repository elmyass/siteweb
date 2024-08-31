import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { ProductResponse } from '../../products/types/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  private apiUrl = `${environment.apiBaseUrl}/products`; 
  products: ProductResponse[] = [];
  selectedProduct: ProductResponse | null = null; 

  @Output() productUpdated = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<ProductResponse[]>(this.apiUrl).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Failed to load products', error);
      }
    );
  }

  onUpdate(product: ProductResponse): void {
    this.selectedProduct = { ...product }; // Clone the product to avoid direct binding
  }

  onSubmit(): void {
    if (this.selectedProduct) {
      this.http.put<ProductResponse>(`${this.apiUrl}/${this.selectedProduct.id}`, this.selectedProduct).subscribe(
        updatedProduct => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          } else {
            this.products.push(updatedProduct);
          }
          this.selectedProduct = null; 
          this.productUpdated.emit(); // Notify the ProductCardComponent to refresh
        },
        error => {
          console.error('Failed to update product', error);
        }
      );
    }
  }

  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`${this.apiUrl}/${productId}`).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          console.log(`Product with ID ${productId} deleted successfully`);
          this.productUpdated.emit(); // Notify the ProductCardComponent to refresh
        },
        error: (err) => {
          console.error('Failed to delete product', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.selectedProduct = null; 
  }
}
