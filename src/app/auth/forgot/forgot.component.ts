import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { afAuthService } from '../services/afAuth.service';
import { MessagesService } from '../../shared/services/messages.service';

@Component({
  selector: 'forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ForgotComponent {
  
  form:FormGroup;
  exit:boolean = false;
  private reExp:any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router:Router, 
              private fb:FormBuilder, 
              private afAuth:afAuthService, 
              private popup:MessagesService) { 
    document.title = 'Forgot Password';
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      mail: ['', Validators.compose([ Validators.required, Validators.email, Validators.pattern(this.reExp)])]
    });
  }

  isEmail():boolean {
    return (!this.form.controls['mail'].valid && this.form.controls['mail'].dirty) ? false : true;
  }

  isValid():boolean {
    return !this.form.valid;
  }

  redirect(){
    this.exit = true;
    setTimeout(() => this.router.navigateByUrl('auth/login'), 500);
  }

  onresetPassword() {
    const { mail } = this.form.value;
    this.afAuth.resetPassword(mail)
    .then(res => {
      if (res && (res.code === "auth/user-not-found")) {
        this.popup.notification('error', 'No hay ningún registro de usuario que corresponda a este correo.','#FFF','top');
      } else {
        this.popup.notification('success', 'Se ha enviado un link a su correo, por favor revise su inbox.','#FFF','center');
      }
    })
    .catch(console.log);
  }
}
