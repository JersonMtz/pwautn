import { Component } from '@angular/core';
import { UserInterface } from '../../models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  form:FormGroup;
  // TODO: Obtener usuario logueado y guardar en profile
  profile:UserInterface = {
    id: 'A1',
    name: 'Zineb Pradi',
    surname: 'Hurtaran Roiz',
    status: true,
    role: true,
    mail: 'correo@ejemplo.net',
    photo: 'https://i.pinimg.com/originals/44/5e/fc/445efcdd7459264333a37ff0cf1febd1.jpg',
    created: '2021-02-19'
  };

  defaultPhoto:string;
  btnReset:boolean;
  btnDelete:boolean;

  /** File photo **/
  private pathCollection:string;
  private namePhoto:string;
  private uploadPhoto:string;

  /** SHOW AND HIDEN PASSWORD **/
  passNow:boolean = false;
  passNew:boolean = false;
  typePassNow:string = 'password';
  typePassNew:string = 'password';

  constructor(private fb:FormBuilder, private popup:MessagesService) { 
    //this.getCurrentUser();
    this.initForm();
    this.onResetPhoto();
  }

  private getCurrentUser() {
    /**
      TODO: 
      obtener usuario logueado y asignarlo a la variable profile y crear el path 
      *users/nombreUsuario
      this.pathCollection = `users/${ this.profile.name.toString().replace(' ','-').toLowerCase() }`; 
    **/
  }

  initForm() {
    this.form = this.fb.group({
      passNow: ['', Validators.required],
      passNew: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,9}[^'\s]/)])]
    });
  }

  onChangePassNow() {
    this.passNow = !this.passNow;
    this.typePassNow = this.passNow ? 'text':'password';
  }

  onChangePassNew() {
    this.passNew = !this.passNew;
    this.typePassNew = this.passNew ? 'text':'password';
  }

  /** METHODS FORMS **/
  hasErrorField(field:string):boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty)
  }

  requiredField(field:string):boolean {
    return this.form.controls[field].errors.required;
  }

  patternField(field:string):boolean {
    return this.form.controls[field].errors.pattern;
  }

  formValid():boolean {
    return this.form.valid;
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  deletePhoto() {
    this.popup.smsDelete('la imágen de avatar').then(res => {
      if (res.isConfirmed) {
        // TODO: ELIMINA EN FIREBASE EL ARCHIVO Y SE ACTUALIZA EL CAMPO PHOTO DE DEL USUARIO 
        console.log('SE ELIMINO');
        this.profile.photo = '';
        this.onResetPhoto();
        this.popup.notification('success','Se elemino con éxito');        
      }
    });
  }
  
  onSelectPhoto(evt:any) {    
    if (evt.target.files && evt.target.files[0]) {
      //TODO: let nameFile = evt.target.files[0].name.split('.');
      //TODO: CAMBIAR PATH this.pathCollection = `${this.pathCollection}-${new Date().getMilliseconds()}.${nameFile[nameFile.length - 1]}`;
      //TODO: this.uploadPhoto = evt.target.files[0];

      let reader = new FileReader();
      reader.onload = (data:ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]); 
      this.btnReset = true;     
    } else {
      this.onResetPhoto();
    }   
  }

  onResetPhoto() {
    this.btnDelete = (this.profile.photo) ? true: false;
    this.defaultPhoto = this.profile.photo || '../../../../assets/img/avatar.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false; 
  }
}
