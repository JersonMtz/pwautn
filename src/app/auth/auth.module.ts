import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

/* COMPONENT AUTH */
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';

const authComponents = [
  AuthComponent,
  LoginComponent,
  ForgotComponent
];

@NgModule({
  declarations: [
    authComponents,
  ],
  exports : [
    authComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
