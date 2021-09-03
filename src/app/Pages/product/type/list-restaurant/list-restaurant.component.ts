import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss']
})
export class ListRestaurantComponent implements OnInit {

  productBean: ProductBean;
  listRestaurants: Array<ProductBean> = [];
  formSearch: FormGroup;
  currentRate = 4.5;

  constructor(
    private sharedService: SharedService,
    public constants: ConstantsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProductByHotel();
    this.formSearch = this.formBuilder.group({
      productName: new FormControl(''),
    });
  }

  public getProductByHotel() {
    let product = new ProductBean();
    product.type = this.constants.TYPE_PRODUCT_RESTAURANT;
    this.sharedService.sendOrRecieveData('/pc/gpbt', product, true)
      .subscribe(list => {
        this.listRestaurants = list.datalist;
        this.listRestaurants.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
  }

  public sendNameProduct() {
    if(this.formSearch.value.productName != '') {
      this.router.navigate(['/pr/search', this.formSearch.value.productName]);
      this.formSearch.patchValue({productName: ''});
    }
  }

  public getProductId(productId: number) {
    this.router.navigate(['/pr/product-detail', productId]);
  }

}
