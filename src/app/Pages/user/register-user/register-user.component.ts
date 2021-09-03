import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  organizationData = false;
  formRegister: FormGroup;
  user: UserBean;
  organization: OrganizationBean;
  typeUser: string = '';
  isRegister: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public constants: ConstantsService,
    public sharedService: SharedService,
    private router: Router
  ) { 
  }
  
  
  ngOnInit(): void {
    this.user = new UserBean();
    this.organization = new OrganizationBean();
    document.getElementById('dataOrganization')?.classList.add('notShow');
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.required])),
      surname: new FormControl('', Validators.compose([Validators.required])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      documentNumber: new FormControl('', Validators.compose([Validators.required])),
      genderType: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      nameOrganization: new FormControl(''),
      ruc: new FormControl(''),
      direction: new FormControl(''),
      phoneOrganization: new FormControl(''),
      responsablePaymentName: new FormControl(''),
      responsablePaymentPhone: new FormControl(''),
      responsablePaymentEmail: new FormControl('')
    }); 
  }

  public cambio(value: any){
    if (value == 'Organizacion') {
      document.getElementById('dataOrganization')?.classList.remove('notShow'); 
      this.organizationData = true;
      this.typeUser = this.constants.TYPE_PROFILE_ORGANIZATION;
      this.formRegister.controls['nameOrganization'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['ruc'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['direction'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['phoneOrganization'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['responsablePaymentName'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['responsablePaymentPhone'].setValidators([Validators.compose([Validators.required])!]);
      this.formRegister.controls['responsablePaymentEmail'].setValidators([Validators.compose([Validators.required])!]);
      
      this.formRegister.get('nameOrganization')!.updateValueAndValidity();
      this.formRegister.get('ruc')!.updateValueAndValidity();
      this.formRegister.get('direction')!.updateValueAndValidity();
      this.formRegister.get('phoneOrganization')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentName')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentPhone')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentEmail')!.updateValueAndValidity();
      
    }else{
      document.getElementById('dataOrganization')?.classList.add('notShow'); 
      this.organizationData = false;
      this.typeUser = this.constants.TYPE_PROFILE_TOURIST;
      
      this.formRegister.patchValue({nameOrganization: ''});
      this.formRegister.patchValue({ruc: ''});
      this.formRegister.patchValue({direction: ''});
      this.formRegister.patchValue({phoneOrganization: ''});
      this.formRegister.patchValue({responsablePaymentName: ''});
      this.formRegister.patchValue({responsablePaymentPhone: ''});
      this.formRegister.patchValue({responsablePaymentEmail: ''});

      this.formRegister.get('nameOrganization')!.clearValidators();
      this.formRegister.get('nameOrganization')!.updateValueAndValidity();
      this.formRegister.get('ruc')!.clearValidators();
      this.formRegister.get('ruc')!.updateValueAndValidity();
      this.formRegister.get('direction')!.clearValidators();
      this.formRegister.get('direction')!.updateValueAndValidity();
      this.formRegister.get('phoneOrganization')!.clearValidators();
      this.formRegister.get('phoneOrganization')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentName')!.clearValidators();
      this.formRegister.get('responsablePaymentName')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentPhone')!.clearValidators();
      this.formRegister.get('responsablePaymentPhone')!.updateValueAndValidity();
      this.formRegister.get('responsablePaymentEmail')!.clearValidators();
      this.formRegister.get('responsablePaymentEmail')!.updateValueAndValidity();
    }
  }

  public save(formRegister: any) {
    this.user.profile = new ProfileBean();
    this.isRegister = true;
    if(formRegister.valid) {
      this.user.name = formRegister.value.name,
      this.user.lastname = formRegister.value.lastname,
      this.user.surname = formRegister.value.lastname,
      this.user.birthDate = formRegister.value.birthDate,
      this.user.documentType = this.constants.TYPE_DOCUMENT_DNI,
      this.user.documentNumber = formRegister.value.lastname,
      this.user.genderTypeId = formRegister.value.genderType,
      this.user.profile.id = +this.typeUser,
      this.user.username = formRegister.value.lastname,
      this.user.password = formRegister.value.lastname,
      this.user.email = formRegister.value.lastname

      if(this.typeUser == this.constants.TYPE_PROFILE_ORGANIZATION) {
        this.organization.name = formRegister.value.nameOrganization,
        this.organization.ruc = formRegister.value.ruc,
        this.organization.direction = formRegister.value.direction,
        this.organization.phone = formRegister.value.phoneOrganization,
        this.organization.responsablePaymentName = formRegister.value.responsablePaymentName,
        this.organization.responsablePaymentPhone = formRegister.value.responsablePaymentPhone,
        this.organization.responsablePaymentEmail = formRegister.value.responsablePaymentEmail

        this.sharedService.sendOrRecieveData('/oc/so', this.organization, true)
        .subscribe(resp => {
          let organizationId = resp.data.id;
          this.user.organizationId = organizationId;
        });
      }
      setTimeout(() => {
        this.sharedService.sendOrRecieveData('/uc/su', this.user, true)
          .subscribe(resp => {
            swal.fire(
              'Se ha registrado correctamente!',
              'Con éxito!',
              'success'
              )
              this.isRegister = false;
              this.router.navigate(['/log']);
          });
      }, 1000);
    }
  }

}
