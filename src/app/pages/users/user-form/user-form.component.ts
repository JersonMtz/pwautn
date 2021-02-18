import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInterface } from '../../../models/user.interface';
import { Router } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnDestroy {

  form:FormGroup;
  private reExpMail:RegExp = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  private reExpPass:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,9}[^'\s]/;
  private user:UserInterface;
  editing:boolean = false;

  defaultPhoto:string;
  btnReset:boolean;

  /** File photo **/
  private pathCollection:string;
  private namePhoto:string;
  private uploadPhoto:string;

  showPass:boolean = false;
  text:string = 'password';

  constructor(private fb:FormBuilder,
              private userService:UserService, 
              private router:Router, 
              private sms:MessagesService) { 
    this.user = this.userService.getUser;
    this.initForm();
    this.verifyForm();
    this.onResetPhoto();
  }

  // TODO: VALIDAR CORREO ÚNICO
  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: [''],
      status: [true, Validators.required],
      role: [false, Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.reExpMail)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.reExpPass)])],
      photo: ['']
    });
  }

  verifyForm() {
    if (this.router.url === "/dashboard/users/edit") {
      if (this.user === undefined) {
        this.sms.alert = {active : true, type: 'info', text: 'Seleccione un usuario antes de editar' };
        this.router.navigateByUrl('/dashboard/users');
      } else {
        this.form.controls['name'].setValue(this.user.name);
        this.form.controls['surname'].setValue(this.user.surname);
        this.form.controls['mail'].setValue(this.user.mail);
        this.form.controls['status'].setValue(this.user.status);
        this.form.controls['role'].setValue(this.user.role);
        this.form.controls['photo'].setValue(this.user.photo);
        this.editing = true;
      }
    }
  }

  show() {
    this.showPass = !this.showPass;
    this.text = this.showPass ? 'text' : 'password';
  }

  getUser():UserInterface {
    return this.user;
  }

  /* METHODS FORM */
  hasErrorName():boolean {
    return (this.form.controls['name'].errors && this.form.controls['name'].dirty)
  }

  hasErrorMail():boolean {
    return (this.form.controls['mail'].errors && this.form.controls['mail'].dirty)
  }

  requiredMail():boolean {
    return this.form.controls['mail'].errors.required;
  }

  notMail():boolean {
    return this.form.controls['mail'].errors.email;
  }

  formatMail():boolean {
    return this.form.controls['mail'].errors.pattern;
  }

  hasErrorPassword():boolean {
    return (this.form.controls['password'].errors && this.form.controls['password'].dirty)
  }

  requiredPassword():boolean {
    return this.form.controls['password'].errors.required;
  }

  formatPassword():boolean {
    return this.form.controls['password'].errors.pattern;
  }

  formValid():boolean {
    return this.form.valid;
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  public builNamePhoto() {
    let tem = `/${this.namePhoto}` || '';
    this.namePhoto = ((this.form.get('name').value).replaceAll(' ','-')).toLowerCase();
    if (this.pathCollection) {
      this.pathCollection = this.pathCollection.replace(tem, `/${this.namePhoto}`);
    }    
  }
  
  public onSelectPhoto(evt:any) {    
    if (evt.target.files && evt.target.files[0]) {
      let nameFile = evt.target.files[0].name.split('.');
      this.uploadPhoto = evt.target.files[0];
      this.builNamePhoto();
      this.pathCollection = `users/${ this.namePhoto }.${ nameFile[nameFile.length - 1] }`;  
      let reader = new FileReader();
      reader.onload = (data:ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
      this.btnReset = true; 
    } else {
      this.onResetPhoto();
    }
  }

  public onResetPhoto() {
    this.defaultPhoto = (this.editing && this.user.photo)? this.user.photo : '../../../../assets/img/avatar.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false;
  }

  ngOnDestroy() {
    this.userService.setUser = undefined;
  }
}
