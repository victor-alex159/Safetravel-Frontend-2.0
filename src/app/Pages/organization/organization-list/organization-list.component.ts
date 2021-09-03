import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2'
// Modelos
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
// Componentes
import { FormOrganizationComponent } from '../form-organization/form-organization.component';
// Servicios
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizationBean: OrganizationBean;
  organizationsList: Array<OrganizationBean> = [];

  page = 1;
  pageSize = 5;

  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.organizationBean = new OrganizationBean();
    this.getListOrganizations();
  }

  // Ventana Modal
  public openModal(organizationId?: number) {
    const modalRef = this.modalService.open(FormOrganizationComponent);
    //modalRef.componentInstance.organizationBean = this.organizationBean;
    if(organizationId != null) {
      modalRef.componentInstance.organizationId = organizationId;
    }
    modalRef.result.then(resp => {
      if(resp) {
        this.getListOrganizations();
      }
    }, dismiss => {
      console.log("Cross Button", dismiss)
    });
  }

  

  public deleteOrganization(organizationId: number) {
    this.organizationBean.id = organizationId;
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
        this.sharedService.sendOrRecieveData('/oc/dobi', this.organizationBean, false)
          .subscribe(resp => {
            swal.fire(
              'Producto eliminado correctamente!',
              '',
              'success'
            )
            this.getListOrganizations();
          });
      }
    })
  }

  public getListOrganizations() {
    if(this.authService.hasRole('Administrador')) {
      this.sharedService.sendOrRecieveData('/oc/gao', {}, false)
      .subscribe(resp => {
        this.organizationsList = resp.datalist;
      });
    } 
  }
}
