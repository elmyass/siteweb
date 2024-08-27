
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartVisibilityService {
  private cartVisibilitySubject = new BehaviorSubject<boolean>(false);
  cartVisibility$ = this.cartVisibilitySubject.asObservable();

  toggleCartVisibility(): void {
    this.cartVisibilitySubject.next(!this.cartVisibilitySubject.value);
  }

  setCartVisibility(isVisible: boolean): void {
    this.cartVisibilitySubject.next(isVisible);
  }
}
