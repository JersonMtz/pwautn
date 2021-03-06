import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '@models/user.interface';
import { MessagesService } from '@shared/services/messages.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnDestroy {

  form:FormGroup;
  private subscription$:Subscription;
  profile:UserInterface = {
    name: '',
    surname: '',
    mail: '',
    role: false,
    photo: {
      path: '',
      url: ''
    }
  };

  btnReset:boolean;
  btnDelete:boolean;

  /** File photo **/
  private photoFile:string;

  /** SHOW AND HIDEN PASSWORD **/
  passNow:boolean = false;
  passNew:boolean = false;
  typePassNow:string = 'password';
  typePassNew:string = 'password';

  constructor(public afAuth:afAuthService, private fb:FormBuilder, private popup:MessagesService) { 
    this.subscription$ = this.afAuth.user$.subscribe(avatar => this.profile = avatar);
    this.initForm();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  private initForm() {
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
        console.log('SE ELIMINO');
        this.popup.notification('success','Se elemino con éxito');        
      }
    });
  }
  
  onSelectPhoto(evt:any) {    
    /* if (evt.target.files && evt.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (data:ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]); 
      this.btnReset = true;     
    }  */  
  }
}
