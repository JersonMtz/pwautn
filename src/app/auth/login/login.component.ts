import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { afAuthService } from "@auth/services/afAuth.service";
import { Subscription } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private sub$: Subscription;
  initing: boolean = false;
  form: FormGroup;
  exit: boolean = false;
  private reExp: any = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

  constructor(private router: Router,
    private fb: FormBuilder,
    private afAuth: afAuthService,
    private popup: MessagesService) {
    document.title = 'Login';
    this.initForm();
  }

  initForm() {
    const mail = localStorage.getItem('mail') || '';
    const check = mail ? true : false;
    this.form = this.fb.group({
      mail: [mail, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.reExp)])],
      pass: ['', Validators.required],
      remember: [check]
    });
  }

  rememberMail() {
    if (this.form.get('remember').value) {
      localStorage.setItem('mail', this.form.get('mail').value);
    } else {
      localStorage.removeItem('mail');
    }
  }

  isValid() {
    return !this.form.valid;
  }

  redirect() {
    this.exit = true;
    setTimeout(() => this.router.navigateByUrl('auth/forgot'), 500);
  }

  middleLogin(data: any) {
    try {
      const { emailVerified } = data.user;
      if (!emailVerified) {
        this.sendMail();
        this.initing = false;
        this.afAuth.logOut();
      } else {
        this.enableUser();
      }
    } catch (err) {
      console.log('Ha ocurrido un error en la respuesta', err);
    }
  }

  onLogin() {
    if (this.form.valid) {
      this.initing = true;
      const { mail, pass } = this.form.value;
      this.afAuth.login(mail, pass).then(res => {
        const err = this.showErrors(res);
        if (!err) {
          this.middleLogin(res);
        }
      });
    }
  }

  private enableUser() {
    this.sub$ = this.afAuth.user$.subscribe(user => {
      if (user.status) {
        this.sub$.unsubscribe();
        this.router.navigateByUrl('/dashboard');
      } else {
        this.popup.beatPopup();
        this.popup.notification('info', '<span class="text-white">Usuario inactivo. Comuniquese con el administrador</span>', '#2799F3', 'center');
        this.afAuth.logOut();
        this.initing = false;
        this.sub$.unsubscribe();
      }
    })
  }

  private sendMail() {
    this.afAuth.verifyMail();
    this.popup.beatPopup();
    this.popup.notification('info', '<span class="text-white">Verifique su cuenta antes de iniciar sesión mediante un enlace enviado a su correo</span>', '#2799F3', 'center');
  }

  private showErrors(data: any): boolean {
    try {
      const { code } = data;
      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        return this.feeback('Usuario o contraseña son incorrectos', '#E6252C');
      }
      if (code === "auth/user-disabled") {
        return this.feeback('Usuario inactivo. Comuniquese con el administrador','#2799F3');
      }
      if (code === "auth/network-request-failed") {
        return this.feeback('Error de comunicación con el servidor. Revise su conexión e intente nuevamente','#2799F3')
      }
      if (code === "auth/too-many-requests") {
        return this.feeback('Se ha inhabilitado esta cuenta temporalmente, restablezca su contraseña o intente más tarde','#2799F3');
      }
    } catch (err) {
      console.log('Ha ocurrido un error en la respuesta', err);
    }
    return false;
  }

  private feeback(text: string, color: string): boolean {
    this.popup.beatPopup();
    this.popup.notification('error', `<span class="text-white">${text}</span>`, color, 'center');
    this.initing = false;
    return true;
  }
}
