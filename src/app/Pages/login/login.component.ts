import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserBean;
  formLogin: FormGroup;
  isLogged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = new UserBean();
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  public login(form: any) {
    this.isLogged = true;
    if(form.valid) {
      this.user = form.value;
      this.authService.login(this.user)
        .subscribe(resp => {
          this.authService.saveUser(resp.access_token);
          this.authService.saveToken(resp.access_token);

          if(this.user.username != null || this.user.password != null) {
            this.isLogged = false;
            this.router.navigate(['/home'])
          }
        }, error => {
          if(error.status == 400) {
            swal.fire('Usuario o constraseña incorrecta!','Error!','error');
          }
        });
    }
  }

}
