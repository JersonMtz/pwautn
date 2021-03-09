import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '@models/user.interface';
import { MessagesService } from '@shared/services/messages.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfUploadService } from '@shared/services/afUpload.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnDestroy {

  form: FormGroup;
  private sub$: Subscription;
  profile: UserInterface = {
    name: '',
    surname: '',
    mail: '',
    role: false,
    photo: {
      path: '',
      url: ''
    }
  };

  loading: boolean;
  private percentage: number = 0;

  /** File photo **/
  photoFile: any;
  private urlPhoto: string;
  local: boolean;

  /** SHOW AND HIDEN PASSWORD **/
  passNow: boolean = false;
  passNew: boolean = false;
  typePassNow: string = 'password';
  typePassNew: string = 'password';

  constructor(public afAuth: afAuthService, private file: AfUploadService, private fb: FormBuilder, private popup: MessagesService) {
    this.sub$ = this.afAuth.user$.subscribe(avatar => this.profile = avatar);
    this.initForm();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  private initForm() {
    this.form = this.fb.group({
      passNow: ['', Validators.required],
      passNew: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,9}[^'\s]/)])]
    });
  }

  onChangePassNow() {
    this.passNow = !this.passNow;
    this.typePassNow = this.passNow ? 'text' : 'password';
  }

  onChangePassNew() {
    this.passNew = !this.passNew;
    this.typePassNew = this.passNew ? 'text' : 'password';
  }

  /** METHODS FORMS **/
  hasErrorField(field: string): boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty)
  }

  requiredField(field: string): boolean {
    return this.form.controls[field].errors.required;
  }

  patternField(field: string): boolean {
    return this.form.controls[field].errors.pattern;
  }

  formValid(): boolean {
    return this.form.valid;
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  private builPathCollection(): string {
    let ext = this.photoFile.name.split('.');
    let name: string = (this.profile.name.replace(/ /gi, '-')).toLowerCase();
    let surname: string = (this.profile.surname.replace(/ /gi, '-')).toLowerCase();
    return `users/${name}-${surname}-${new Date().getMilliseconds()}.${ext[ext.length - 1]}`;
  }

  onSelectPhoto(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      this.photoFile = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (data: ProgressEvent<FileReader>) => this.urlPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
    } else {
      this.photoFile = null;
    }
  }

  getPercentage(): string {
    return this.percentage.toString();
  }

  defaultImg(): string {
    if (this.profile.photo.url) {
      this.local = false;
      return this.profile.photo.url;
    } else {
      this.local = true;
      return this.urlPhoto || './../../../assets/img/avatar.png';
    }
  }

  uploadPhoto() {
    this.popup.smsConfirm('Atención', '¿Desea guardar la imágen de perfil?').then(res => {
      if (res.isConfirmed) {
        this.loading = true;
        let path = this.builPathCollection();
        this.file.fileUpload(this.photoFile, path);
        this.file.percent$.pipe(
          finalize(() => this.file.url$.subscribe(url => {
            this.afAuth.updatePhoto(this.profile.id, path, url)
            this.photoFile = null;
          })))
          .subscribe(value => {
            this.percentage = parseInt(value.toString());
            if (this.percentage === 100) {
              this.percentage = 0;
              this.loading = false;
            }
          });
      }
    });
  }

  deletePhoto() {
    this.popup.smsConfirm('Atención', '¿Desea eliminar la imágen de avatar?').then(res => {
      if (res.isConfirmed) {
        this.urlPhoto = '';
        if (this.profile.photo.url) {
          this.file.fileDelete(this.profile.photo.path)
            .then(() => {
              this.afAuth.updatePhoto(this.profile.id);
              this.photoFile = null;
            })
            .catch(err => this.popup.notification('error', `Ha ocurrido un error: ${err}`));
        } else {
          this.photoFile = null;
        }
      }
    });
  }

  changePassword() {
    this.popup.smsConfirm('Atención','¿Desea cambiar la contraseña?').then(res => {
      if (res.isConfirmed) {
        this.afAuth.reauthentication(this.form.get('passNow').value, this.form.get('passNew').value);
        this.photoFile = null;
        this.form.reset();
      }
    })
  }
}
