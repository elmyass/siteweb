import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,  // Admin dashboard as the default view for the admin panel
    children: [
      { path: 'add-product', component: AddProductComponent },  // Route to add a product
      { path: 'manage-products', component: ManageProductsComponent },  // Route to manage existing products
      { path: '', redirectTo: 'manage-products', pathMatch: 'full' }, // Default child route to manage products
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
