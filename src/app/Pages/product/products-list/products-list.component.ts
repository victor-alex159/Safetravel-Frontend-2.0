import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormProductComponent } from '../form-product/form-product.component';
import swal from 'sweetalert2'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productsList: Array<ProductBean> = [];
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  public openModal(productId?: number) {
    const modalRef = this.modalService.open(FormProductComponent);
    if(productId != null) {
      modalRef.componentInstance.productId = productId;
    }
    modalRef.result.then(resp => {
      if(resp) {
        this.getListProducts();
      }
    }, dismiss => {
      console.log("Cross Button", dismiss)
    });
  }

  public getListProducts() {
    this.productsList = [];
    if(this.authService.hasRole('Administrador')) {
      this.sharedService.sendOrRecieveData('/pc/gap', {}, false)
      .subscribe(resp => {
        this.productsList = resp.datalist;
      });
    } else {
      let data = {};
      this.sharedService.sendOrRecieveData('/pc/gpbup', data, false)
      .subscribe(resp => {
        this.productsList = resp.datalist;
      });
    }
  }

  public deleteProduct(productId: number) {
    let producSelected: ProductBean = new ProductBean();
    producSelected.id = productId;
    swal.fire({
      title: '¿Seguro de eliminar?',
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
              'Empresa eliminado correctamente!',
              '',
              'success'
            )
            this.getListProducts();
          });
      }
    })
  }

}
