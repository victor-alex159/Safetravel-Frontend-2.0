import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { SharedService } from 'src/app/services/shared.service';

import swal from 'sweetalert2'

@Component({
  selector: 'app-form-organization',
  templateUrl: './form-organization.component.html',
  styleUrls: ['./form-organization.component.scss']
})
export class FormOrganizationComponent implements OnInit {

  @Input() organizationId: number; // id de organizacion - viene del listado de organizacion
  formRegisterOrganization: FormGroup;
  organization: OrganizationBean;
  edit: boolean = false;
  

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.organization = new OrganizationBean();
    this.formRegisterOrganization = this.formBuilder.group({
      nameOrganization: new FormControl('', Validators.compose([Validators.required])),
      ruc: new FormControl('', Validators.compose([Validators.required])),
      direction: new FormControl('', Validators.compose([Validators.required])),
      managerName: new FormControl('', Validators.compose([Validators.required])),
      managerPhone: new FormControl('', Validators.compose([Validators.required])),
      managerEmail: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required]))
    });

    if (this.organizationId) {
      this.getOrganization(this.organizationId);
      this.edit = true;
    }
    else
      this.edit = false;
    
  }

  public save(formRegisterOrganization: any){
    if(formRegisterOrganization.valid){
      this.organization.name = formRegisterOrganization.value.nameOrganization;
      this.organization.ruc = formRegisterOrganization.value.ruc;
      this.organization.direction = formRegisterOrganization.value.direction;
      this.organization.phone = formRegisterOrganization.value.phone;
      this.organization.responsablePaymentName = formRegisterOrganization.value.managerName;
      this.organization.responsablePaymentEmail = formRegisterOrganization.value.managerEmail;
      this.organization.responsablePaymentPhone = formRegisterOrganization.value.managerPhone;
    
      this.sharedService.sendOrRecieveData('/oc/so', this.organization, true)
            .subscribe( resp => {
              // Se registro la nueva organizacion
              // Mensaje de confirmacion
              setTimeout(() => {
                    swal.fire(
                      'Se ha guardado correctamente!',
                      'Con éxito!',
                      'success'
                      )
                  
              }, 1000);
            })
    }
  }

  public getOrganization(organizationId: number){
    this.organization.id = organizationId;
    this.sharedService.sendOrRecieveData('/oc/gobi', this.organization, false)
    .subscribe(resp=>{
      this.organization = resp.data;
      this.formRegisterOrganization.patchValue({nameOrganization: this.organization.name});
      this.formRegisterOrganization.patchValue({ruc: this.organization.ruc});
      this.formRegisterOrganization.patchValue({direction: this.organization.direction});
      this.formRegisterOrganization.patchValue({managerName: this.organization.responsablePaymentName});
      this.formRegisterOrganization.patchValue({managerPhone: this.organization.responsablePaymentPhone});
      this.formRegisterOrganization.patchValue({managerEmail: this.organization.responsablePaymentEmail});
      this.formRegisterOrganization.patchValue({phone: this.organization.phone});
    })
  }
}
