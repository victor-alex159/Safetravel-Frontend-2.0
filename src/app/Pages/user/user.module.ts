import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormUserComponent } from './form-user/form-user.component';


@NgModule({
  declarations: [
    RecoverPasswordComponent, RegisterUserComponent, ChangePasswordComponent, FormUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
