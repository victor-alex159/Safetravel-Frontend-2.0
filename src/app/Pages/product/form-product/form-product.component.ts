import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formRegister: FormGroup;
  productBean: ProductBean;
  image: string;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  urlImageSelected: any;
  listServiceSelected: Array<any> = [];
  listServices: Array<any> = [];
  listServiceCodes: Array<any> = [];
  @Input() productId: number;
  listTypeProduct: Array<String> = ['Hotel', 'Restaurante'];
  
  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private sharedService: SharedService,
    private sanitization: DomSanitizer,
    private formBuilder: FormBuilder,
    public constants: ConstantsService
  ) { }

  ngOnInit(): void {
    this.productBean = new ProductBean();
    this.listServiceSelected = [];
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      ubication: new FormControl('', Validators.compose([Validators.required])),
      typeProduct: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      priceMin: new FormControl('', Validators.compose([Validators.required])),
      priceMax: new FormControl('', Validators.compose([Validators.required])),
      emailAdmin: new FormControl('', Validators.compose([Validators.required]))
    });
    this.getAllServices();
    if(this.productId) {
      this.getProduct(this.productId);
      this.sharedService.getImageById('/pc/gi', this.productId)
        .subscribe(resp => {
          if (resp.data) {
            this.getImage(resp.data);
          }
        });
    }
  }

  public save(formRegister: any) {
    if(formRegister.valid) {
      this.productBean.name = formRegister.value.name;
      this.productBean.type = formRegister.value.typeProduct;
      this.productBean.longDescription = formRegister.value.description;
      this.productBean.ubication = formRegister.value.ubication;
      this.productBean.priceMin = formRegister.value.priceMin
      this.productBean.priceMax = formRegister.value.priceMax
      this.productBean.emailAdmin = formRegister.value.emailAdmin
      this.productBean.status = this.productBean.status != null ? this.productBean.status : this.constants.STATUS_DISABLED;
      if(this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0)!;
      } else {
        this.currentFileUpload = new File( [''], 'None' );
      }
      if(this.listServiceSelected.length > 0) {
        let servicesCodes = '';
        this.listServiceSelected.forEach(serviceCode => {
          servicesCodes = servicesCodes + serviceCode.concat(',');
        });
        this.productBean.serviceId = servicesCodes.substring(0, servicesCodes.length-1);
      }
      this.sharedService.sendDataWithFile('/pc/sv', this.productBean, 'product', this.currentFileUpload)
      .subscribe(resp => {
        swal.fire(
          'Se ha registrado correctamente!',
          'Con éxito',
          'success'
          )
        });
      setTimeout(() => {
        this.activeModal.close(true);
      }, 1000);
    }
  }

  public getProduct(productId: number) {
    let productBean = new ProductBean();
    productBean.id = productId;
    this.listServiceCodes = [];
    this.sharedService.sendOrRecieveData('/pc/gpbi', productBean, false)
    .subscribe(resp => {
      this.productBean = resp.data;
      this.formRegister.patchValue({name: this.productBean.name});
      this.formRegister.patchValue({typeProduct: this.productBean.type});
      this.formRegister.patchValue({ubication: this.productBean.ubication});
      this.formRegister.patchValue({description: this.productBean.longDescription});
      this.formRegister.patchValue({priceMin: this.productBean.priceMin});
      this.formRegister.patchValue({priceMax: this.productBean.priceMax});
      this.formRegister.patchValue({emailAdmin: this.productBean.emailAdmin});

      this.productBean.imagePath = resp.data.imagePath;
      if(this.productBean.serviceId != null) {
        this.listServiceCodes = this.productBean.serviceId.split(',');
      }
    });
  }

  public getAllServices() {
    let service = new ServiceBean();
    this.sharedService.sendOrRecieveData('/sc/gas', service, false)
    .subscribe(resp => {
      this.listServices = resp.datalist;
    });
  }  

  getImage(base64: any){
    let objectURL = 'data:image/jpeg;base64,' + base64;
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
    this.imagenEstado = true;
  }

  selectImage(e: any): void {
    this.image = e.target.files[0].name;
    this.selectedFiles = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload= (e)=> {
      this.urlImageSelected = e.target!.result;
    };
    this.imagenEstado = false
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

}
