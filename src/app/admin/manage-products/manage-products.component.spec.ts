import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ProductResponse } from '../../products/types/product.model';

@Component({
  selector: 'app-manage-products',
  
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: ProductResponse[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(data => {
      console.log('Données reçues:', data);
      this.products = data;
    });
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onUpdate(product: ProductResponse): void {
    // Navigate to the update form or open a modal for editing
  }

  onDelete(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(productId).subscribe(() => {
        this.loadProducts(); // Refresh the list after deletion
      });
    }
  }
}
