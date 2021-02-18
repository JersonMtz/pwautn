import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  private pathCollection:string;
  private namePhoto:string;
  private uploadPhoto:string;
  defaultPhoto:string;
  btnReset:boolean;

  showPass:boolean = false;
  text:string = 'password';
  form:FormGroup;
  private reExpMail:RegExp = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  private reExpPass:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,9}[^'\s]/;

  constructor(private fb:FormBuilder) { 
    this.onResetPhoto();
    this.initForm();
  }

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

  show() {
    this.showPass = !this.showPass;
    this.text = this.showPass ? 'text' : 'password';
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
  /*** METHODS PHOTO USER UPLOAD***/
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
      this.pathCollection = `products/${ this.namePhoto }.${ nameFile[nameFile.length - 1] }`;  
      let reader = new FileReader();
      reader.onload = (data:ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
      this.btnReset = true; 
    } else {
      this.onResetPhoto();
    }
  }

  public onResetPhoto() {
    this.defaultPhoto =  '../../../../assets/img/avatar.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false;
  }
}
