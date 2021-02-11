import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  
  form:FormGroup;
  exit:boolean = false;
  private interval:any;
  private reExp:any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private url:Router, private fb:FormBuilder) { 
    this.form = this.fb.group({
      mail : ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.reExp)])],
      pass : ['', Validators.required]
    });
  }

  isValid(){
    return !this.form.valid;
  }

  onSubmit() {
    console.log('lógica de firebase para conectar');
    this.url.navigateByUrl('/dashboard');
  }


  redirect(){
    this.exit = true;
    this.interval = setInterval( () => this.url.navigateByUrl('auth/forgot'), 500);
  }

  ngOnDestroy() { clearInterval(this.interval) }
}
