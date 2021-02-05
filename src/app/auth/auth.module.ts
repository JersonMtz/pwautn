import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

/* COMPONENT AUTH */
import { LoginComponent } from './login/login.component';

const authComponents = [
  LoginComponent
];

@NgModule({
  declarations: [
    authComponents
  ],
  exports : [
    authComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
