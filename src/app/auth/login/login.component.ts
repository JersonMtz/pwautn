import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  initing:boolean = false;

  form:FormGroup;
  exit:boolean = false;
  private reExp:any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router:Router, 
              private fb:FormBuilder, 
              private afAuth:AuthService,
              private popup:MessagesService) { 
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

  onLogin() {
    if (this.form.valid) {
      this.initing = true;
      const { mail, pass } = this.form.value;
      this.afAuth.login(mail, pass).then(res => {
        const { emailVerified } = res.user;
        //TODO: PRODUCTION
        if (!emailVerified) {
          this.popup.beatPopup();
          this.popup.notification('info','<span class="text-white">Verifique su cuenta antes de iniciar sesión</span>','#2799F3','center');
        } else {
          //obtener datos de la collection
          //this.afUser.getUser(uid).pipe(map(res => res.payload.data())).subscribe(console.log);
          //iniciar sesión
        }
        /**** SIMULACRO ***/
        this.initing = false;
      }).catch(err => {
        if (err && (err.code === "auth/user-not-found" || err.code === "auth/wrong-password")) {
          this.popup.beatPopup();
          this.popup.notification('error','<span class="text-white">Usuario o contraseña son incorrectos</span>','#E6252C','top');
        }
        if (err && (err.code === "auth/user-disabled")) {
          this.popup.beatPopup();
          this.popup.notification('info','<span class="text-white">Usuario inactivo. Comuniquese con el administrador</span>','#2799F3','center');
        }
        if (err && (err.code === "auth/network-request-failed")) {
          this.popup.beatPopup();
          this.popup.notification('info','<span class="text-white">Error de comunicación con el servidor. Revise su conexión e intente nuevamente</span>','#2799F3','top');
        }
        this.initing = false;
      });
    }
  }
}
