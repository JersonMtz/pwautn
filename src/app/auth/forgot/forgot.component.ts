import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ForgotComponent {
  
  form:FormGroup;
  exit:boolean = false;
  private reExp:any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router:Router, private fb:FormBuilder) { 
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
}
