import { Component, OnInit } from '@angular/core';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-validate-products',
  templateUrl: './validate-products.component.html',
  styleUrls: ['./validate-products.component.scss']
})
export class ValidateProductsComponent implements OnInit {

  productsList: Array<ProductBean> = [];
  page = 1;
  pageSize = 5;
  canceledValidate: boolean = false;

  constructor(
    private sharedService: SharedService,
    public authService: AuthService,
    public constants: ConstantsService
    
  ) { }

  ngOnInit(): void {
    this.getListProductsDisabled();
  }

  public getListProductsDisabled() {
    if(this.authService.hasRole('Administrador')) {
      this.sharedService.sendOrRecieveData('/pc/gapd', {}, false)
      .subscribe(resp => {
        this.productsList = resp.datalist;
      }, error => {
        console.log(error);
      });
    }
  }

  public validateProduct(productId: number) {
    swal.fire({
      title: '¿Seguro de aceptar esta empresa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed) {
        let producSelected = new ProductBean();
        producSelected.id = productId;
        this.sharedService.sendOrRecieveData('/pc/uep', producSelected, false)
          .subscribe(resp => {
            swal.fire(
              'Empresa aceptado correctamente!',
              '',
              'success'
            )
            this.getListProductsDisabled();
          });
      }
    })
  }

  public deniedProduct(productId: number) {
    let producSelected: ProductBean = new ProductBean();
    producSelected.id = productId;
    swal.fire({
      title: '¿Seguro de denegar esta Empresa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed) {
        this.sharedService.sendOrRecieveData('/pc/dp', producSelected, false)
          .subscribe(resp => {
            swal.fire(
              'Empresa denegada correctamente!',
              '',
              'success'
            )
            this.getListProductsDisabled();
          });
      }
    })
  }

}
