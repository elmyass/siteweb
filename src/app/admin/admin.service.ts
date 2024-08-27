import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../products/types/product.model';
import { environment } from '../../environment';
import { ProductRequest } from '../products/types/product.model';



export class AdminService {

  private apiUrl = `${environment.apiBaseUrl}/products`; // Base URL for the products API

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl);
  }

  // Fetch a product by ID
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

 // Dans admin.service.ts
addProduct(product: ProductRequest): Observable<ProductResponse> {
  return this.http.post<ProductResponse>(`${this.apiUrl}`, product);
}


  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a product
  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, product);
  }
}
