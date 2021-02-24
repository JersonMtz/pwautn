import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  form:FormGroup;
  exit:boolean = false;
  private reExp:any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router:Router, private fb:FormBuilder) { 
    document.title = 'Login';
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      mail : ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.reExp)])],
      pass : ['', Validators.required]
    });
  }

  isValid(){
    return !this.form.valid;
  }

  onSubmit() {
    // TODO: lógica de firebase para conectar
    this.router.navigateByUrl('/dashboard');
  }

  redirect(){
    this.exit = true;
    setTimeout(() => this.router.navigateByUrl('auth/forgot'), 500);
  }
}
