import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ValidateProductsComponent } from './validate-products/validate-products.component';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ResultProductsComponent } from './result-products/result-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListHotelComponent } from './type/list-hotel/list-hotel.component';
import { ListRestaurantComponent } from './type/list-restaurant/list-restaurant.component';


@NgModule({
  declarations: [
    ValidateProductsComponent, FormProductComponent, ProductDetailComponent, ProductsListComponent,
    ResultProductsComponent, ListHotelComponent, ListRestaurantComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ProductModule { }
