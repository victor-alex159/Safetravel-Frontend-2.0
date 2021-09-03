import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formSearch: FormGroup;

  constructor(
    private sharedService: SharedService,
    public constants: ConstantsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formSearch = this.formBuilder.group({
      productName: new FormControl(''),
    });
  }

  public sendNameProduct() {
    if(this.formSearch.value.productName != '') {
      this.router.navigate(['/pr/search', this.formSearch.value.productName]);
      this.formSearch.patchValue({productName: ''});
    }
  }

}
