import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ProductResponse } from '../../products/types/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {


  private apiUrl = `${environment.apiBaseUrl}/products`; 

  products: ProductResponse[] = [];

  constructor(private http: HttpClient) {

   }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<ProductResponse[]>(this.apiUrl).subscribe(products => {
      this.products = products;
    });
  }

  onUpdate(product: ProductResponse): void {
    // Navigate to the update form or open a modal for editing
  }

  onDelete(productId: number): void {
    
  }
}
