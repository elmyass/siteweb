import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from '../cart/cart.component'; 
const routes: Routes = [
  { path: 'card', component: ProductCardComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent }, // Add the Cart route here
  { path: '', redirectTo: 'card', pathMatch: 'full' },
  { path: '**', redirectTo: 'card', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}