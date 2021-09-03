import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommentaryBean } from 'src/app/Beans/CommentaryBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  productBean: ProductBean = new ProductBean();
  user: UserBean;
  commentary: CommentaryBean;
  listCommentaries: Array<any> = [];
  commentariesWithUsername: Array<any> = [];
  formCommentary: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sanitization: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.commentary = new CommentaryBean();
    this.user = new UserBean();
    this.formCommentary = this.formBuilder.group({
      commentary: new FormControl('')
    });
    this.productId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getProductDetailById(this.productId);
    this.getListCommentaries();
  }

  public getProductDetailById(productId: number) {
    let product = new ProductBean();
    product.id = productId;
    this.sharedService.sendOrRecieveData('/pc/gpbi', product, false)
      .subscribe(resp => {
        this.productBean = resp.data;
        let objectURL = 'data:image/jpeg;base64,' + this.productBean.image;
        this.productBean.imageFile = this.sanitization.bypassSecurityTrustResourceUrl(objectURL);
      });
  }

  public saveCommentary() {
    let productFromCommentary = new ProductBean();
    productFromCommentary.id = this.productId;
    let data = {
      description: this.formCommentary.value.commentary,
      product: productFromCommentary
    }
    if(this.authService.isAthenticated()) {
      if(this.formCommentary.value.commentary != undefined) {
        if(this.formCommentary.value.commentary.trim() != '') {
          this.sharedService.sendOrRecieveData('/cmc/sc', data, false)
            .subscribe(resp => {
              this.getListCommentaries();
            });
        } else {
          swal.fire('Ingrese un comentario', '','warning');
        }
      } else {
        swal.fire('Ingrese un comentario', '','warning');
      }
    } else {
      swal.fire('Debe registrarse o iniciar sesión para comentar', '','warning');
    }
  }

  public getListCommentaries() {
    let commentaryData = new CommentaryBean();
    commentaryData.product = new ProductBean();
    commentaryData.product.id = this.productId; 
    this.sharedService.sendOrRecieveData('/cmc/gcbpi', commentaryData, false)
      .subscribe(resp => {
        this.listCommentaries = resp.datalist;
      });
  }

}
