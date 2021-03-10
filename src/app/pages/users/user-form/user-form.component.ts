import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { UserInterface } from '@models/user.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfUserService } from '@pages/users/services/afUser.service';
import { Validator } from "@utils/validator.firebase";
import { AfUploadService } from '@shared/services/afUpload.service';
import { afAuthService } from '@auth/services/afAuth.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnDestroy {

  items: BreadcrumbInterface[];
  form: FormGroup;
  user: UserInterface = {
    name: '',
    surname: '',
    mail: '',
    role: false,
    photo: {
      path: '',
      url: './../../../assets/img/avatar.png'
    }
  };

  loading: boolean;
  private percentage: number = 0;

  /** File photo **/
  photoFile: any;

  editing: boolean;
  btnDelete: boolean;

  private reExpMail: RegExp = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  private reExpPass: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,9}[^'\s]/;

  showPass: boolean = false;
  text: string = 'password';

  constructor(private fb: FormBuilder,
    private afAuth: afAuthService,
    private afUser: AfUserService,
    private afUpload: AfUploadService,
    private router: Router,
    private popup: MessagesService) {
    this.initForm();
    this.verifyForm();
    this.buildBreadcrumb();
  }

  ngOnDestroy() {
    this.afUser.setUser = undefined;
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: [''],
      status: [true, Validators.required],
      role: [false, Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.reExpMail)]), Validator.checkMail(this.afUser)],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.reExpPass)])],
      photo: [{ path: '', url: '' }],
      created: [this.getDate(), Validators.required]
    });
  }

  private getDate(): string {
    let objDate: Date = new Date();
    let day: string = (objDate.getDate() < 10) ? `0${objDate.getDate()}` : objDate.getDate().toString();
    let month: string = (objDate.getMonth() < 10) ? `0${objDate.getMonth() + 1}` : objDate.getMonth().toString();
    return `${objDate.getFullYear()}-${month}-${day}`;
  }

  verifyForm() {
    if (this.router.url === "/dashboard/users/edit") {
      this.user = this.afUser.getUser;
      if (this.user === undefined) {
        this.popup.alert = { active: true, type: 'info', text: 'Seleccione un usuario antes de editar' };
        this.router.navigateByUrl('/dashboard/users');
      } else {
        let tem = {
          ...(this.user),
          password: 'abcd'
        };
        this.form.setValue(tem);
        this.editing = true;
      }
    }
  }

  private buildBreadcrumb() {
    this.items = [
      {
        url: '/dashboard',
        icon: 'fas fa-home',
        title: 'Inicio'
      },
      {
        url: '/dashboard/users',
        icon: 'fas fa-users',
        title: 'Usuarios'
      },
      {
        icon: this.editing ? 'fas fa-edit mt-1' : 'fas fa-plus-circle mt-1',
        title: this.editing ? 'Editar' : 'Agregar'
      }
    ];
  }

  private isEnableForm() {
    if (this.formValid() && this.loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  show() {
    this.showPass = !this.showPass;
    this.text = this.showPass ? 'text' : 'password';
  }

  updateUser() {
    if (this.validUpdate()) {
      this.popup.smsConfirm('Atención','¿Desea actualizar usuario?').then(res => {
        if (res.isConfirmed) {
          this.afUser.update(this.form.value);
        }
      })
    }
  }

  addUser() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea registrar usuario?').then(res => {
        if (res.isConfirmed && !this.loading) {
          this.loading = true;
          this.isEnableForm();
          let { mail, password } = this.form.value;
          this.afAuth.createUser(mail, password)
            .then(account => {
              this.form.get('id').setValue(account.user.uid);
              this.saveCollection();
            }).catch(err => {
              if (err.code === 'auth/email-already-in-use') {
                this.popup.notification('error', `<span class="text-white">Ha ocurrido un error. El correo  ${mail}  esta siendo utilizado en otra cuenta.</span>`, '#E6252C', 'center');
              }
            });
        }
      })
    }
  }

  saveCollection() {
    if (this.photoFile) {
      let path: string = this.builPathCollection();
      this.afUpload.fileUpload(this.photoFile, path);
      this.afUpload.percent$.pipe(
        finalize(() => this.afUpload.url$.subscribe(url => {
          this.form.get('photo').setValue({ path, url });
          this.afUser.add(this.form.value);
          this.form.reset();
        })))
        .subscribe(value => {
          this.percentage = parseInt(value.toString());
          if (this.percentage === 100) {
            this.percentage = 0;
          }
        });
    } else {
      this.afUser.add(this.form.value);
      this.form.reset();
    }
  }

  /* METHODS FORM */
  hasErrorField(field: string): boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty);
  }

  requiredField(field: string): boolean {
    return this.form.controls[field].errors.required;
  }

  patternField(field: string): boolean {
    return this.form.controls[field].errors.pattern;
  }

  isMail(): boolean {
    return this.form.controls['mail'].errors.email;
  }

  errorMail() {
    return this.form.controls['mail'].hasError('notEnable');
  }

  formValid(): boolean {
    return this.form.valid;
  }

  validUpdate() {
    return this.form.get('status').dirty || this.form.get('role').dirty;
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  deletePhoto() {
    this.popup.smsConfirm('Atención', '¿Desea remover la imágen de perfil?').then(res => {
      if (res.isConfirmed) {
        this.initPhoto();
      }
    })
  }


  private initPhoto() {
    this.photoFile = null;
    this.btnDelete = false;
    this.user.photo.url = './../../../assets/img/avatar.png';
  }

  private builPathCollection(): string {
    let ext = this.photoFile.name.split('.');
    let name: string = (this.form.get('name').value.replace(/ /gi, '-')).toLowerCase();
    let surname: string = (this.form.get('surname').value.replace(/ /gi, '-')).toLowerCase();
    return `users/${name}-${surname}-${new Date().getMilliseconds()}.${ext[ext.length - 1]}`;
  }

  onSelectPhoto(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      this.photoFile = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (data: ProgressEvent<FileReader>) => this.user.photo.url = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
    } else {
      this.initPhoto();
    }
  }

  getPercentage(): string {
    return `${this.percentage.toString()}%`;
  }
}
