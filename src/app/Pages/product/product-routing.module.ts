import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ResultProductsComponent } from './result-products/result-products.component';
import { ListHotelComponent } from './type/list-hotel/list-hotel.component';
import { ListRestaurantComponent } from './type/list-restaurant/list-restaurant.component';
import { ValidateProductsComponent } from './validate-products/validate-products.component';

const routes: Routes = [
  { path: 'restaurantes', component: ListRestaurantComponent },
  { path: 'hoteles', component: ListHotelComponent },
  { path: 'list', component: ProductsListComponent },
  { path: 'search/:name', component: ResultProductsComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'validate', component: ValidateProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
