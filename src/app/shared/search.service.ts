import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm$ = this.searchTermSource.asObservable();

  updateSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }

  filterProducts(products: ProductResponse[]): ProductResponse[] {
    const searchTerm = this.searchTermSource.getValue().toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }
}
