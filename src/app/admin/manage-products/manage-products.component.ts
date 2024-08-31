import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation
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

  constructor(
    private http: HttpClient,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Method to load all products
  loadProducts(): void {
    this.http.get<ProductResponse[]>(this.apiUrl).subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Failed to load products', error);
        // Optionally display a user-friendly error message here
      }
    );
  }

  // Method to handle updating a product
  onUpdate(product: ProductResponse): void {
    // Navigate to the update form, passing the product ID
    this.router.navigate(['/admin/update-product', product.id]);
  }

  // Method to handle deleting a product
  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`${this.apiUrl}/${productId}`).subscribe({
        next: () => {
          // Update the local products array to remove the deleted product
          this.products = this.products.filter(p => p.id !== productId);
          console.log(`Product with ID ${productId} deleted successfully`);
        },
        error: (err) => {
          console.error('Failed to delete product', err);
          // Optionally display a user-friendly error message here
        },
        complete: () => {
          console.log('Delete request completed');
        }
      });
    }
  }
  
  }

