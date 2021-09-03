import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-result-products',
  templateUrl: './result-products.component.html',
  styleUrls: ['./result-products.component.scss']
})
export class ResultProductsComponent implements OnInit {

  product: ProductBean;
  formSearch: FormGroup;
  productList: Array<any> = [];
  nameProduct: string = '';
  imagenData: any;
  listServices: Array<ServiceBean> = [];
  listServiceSelected: Array<any> = [];
  page = 1;
  pageSize = 5;

  constructor(
    private sharedService: SharedService,
    public constants: ConstantsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitization: DomSanitizer,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = new ProductBean();
    this.formSearch = this.formBuilder.group({
      productName: new FormControl(''),
    });
    this.nameProduct = this.route.snapshot.paramMap.get('name')!;
    if(this.nameProduct != '' && this.nameProduct != null) {
      this.searchProductDetailByName(this.nameProduct);
    }
    this.getAllServices();
  }

  public search() {
    if(this.listServiceSelected.length>0) {
      let servicesCodes = '';
      this.listServiceSelected.forEach(serviceCode => {
        servicesCodes = servicesCodes + serviceCode.concat(',');
      });
      this.product.serviceId = servicesCodes.substring(0, servicesCodes.length-1);
    }
    this.sharedService.sendOrRecieveData('/pc/gpbnad', this.product, false)
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
      this.product.serviceId = '';
  }

  public getAllServices() {
    let service = new ServiceBean();
    this.sharedService.sendOrRecieveData('/sc/gas', service, false)
    .subscribe(resp => {
      this.listServices = resp.datalist;
    });
  }

  public selectService(e: any) {
    let codeServiceSelected = e.target.value;
    if(e.target.checked) {
      if(codeServiceSelected != null) {
        this.listServiceSelected.push(codeServiceSelected);
      }
    } else {
      let pos = 0;
      this.listServiceSelected.forEach(codeService => {
        if(codeService == codeServiceSelected) {
          this.listServiceSelected.splice(pos, 1);
        }
        pos++;
      });
    }
  }

  public searchProductDetailByName(name: string) {
    let product = new ProductBean();
    product.name = name;
    this.sharedService.sendOrRecieveData('/pc/gpbnad', product, false)
      .subscribe(resp => {
        this.productList = resp.data;
        this.productList.forEach(pd => {
          let objectURL = 'data:image/jpeg;base64,' + pd.image;
          pd.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
        });
      });
      //this.formSearch.patchValue({productName: ''});
      this.nameProduct = '';
  }

  public getProductId(productId: any) {
    this.router.navigate(['/pr/product-detail', productId]);
  }

}
