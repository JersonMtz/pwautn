import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { CategoryInterface } from '@models/category.interface';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { AfCategoryService } from '@pages/category/services/afCategory.service';
import { AfUploadService } from "@shared/services/afUpload.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnDestroy {

  /** File photo **/
  photoFile: any;

  private expNumber: RegExp = /^([0-9])*$/;
  private local: boolean;
  product: ProductInterface;
  categoryList: CategoryInterface[] = [];
  items: BreadcrumbInterface[];
  form: FormGroup;
  err: any = {
    existCode: false,
    existName: false
  };

  editing: boolean;
  btnDelete: boolean;
  loading: boolean;
  private percentage: number = 0;
  private sub$: Subscription;

  constructor(private fb: FormBuilder,
    private afProduct: AfProductService,
    private afCategory: AfCategoryService,
    private router: Router,
    private popup: MessagesService,
    private afUpload: AfUploadService) {
    document.getElementById('a-product').classList.toggle('active');
    this.getCategories();
    this.initForm();
    this.verifyForm();
    this.buildBreadcrumb();
  }

  ngOnDestroy() {
    this.afProduct.setProduct = undefined;
    document.getElementById('a-product').classList.toggle('active');
  }

  private initForm() {
    this.form = this.fb.group({
      id: [''],
      code: [''],
      name: ['', Validators.required],
      cost: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      stock: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      category: ['', Validators.required],
      status: [true, Validators.required],
      description: [''],
      photo: [{ path: '', url: '' }]
    });
  }

  private getCategories() {
    this.afCategory.list().subscribe(list => this.categoryList = list);
  }

  private buildBreadcrumb() {
    this.items = [
      {
        url: '/dashboard',
        icon: 'fas fa-home',
        title: 'Inicio'
      },
      {
        url: '/dashboard/products',
        icon: 'fas fa-cubes',
        title: 'Productos'
      },
      {
        icon: this.editing ? 'fas fa-edit mt-1' : 'fas fa-plus-circle mt-1',
        title: this.editing ? 'Editar' : 'Agregar'
      }
    ];
  }

  private saveData() {
    let { id, ...data } = this.form.value;
    this.afProduct.add(data);
    this.loading = false;
    this.form.reset();
    this.form.get('status').setValue(true);
    this.form.get('photo').setValue({ path: '', url: '' });
    this.reload();
    this.isEnableForm();
  }

  addProduct() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed && !this.loading) {
          this.loading = true;
          this.isEnableForm();
          if (this.photoFile) {
            this.afUpload.fileUpload(this.photoFile, this.builPathCollection());
            this.afUpload.percent$.pipe(
              finalize(() => this.afUpload.url$.subscribe(url => {
                this.form.get('photo').value.url = url;
                this.saveData();
              })))
              .subscribe(value => {
                this.percentage = parseInt(value.toString());
                if (this.percentage === 100) {
                  this.percentage = 0;
                }
              });
          } else {
            this.saveData();
          }
        }
      })
    }
  }

  updateProduct() {
    if (this.formValid() && this.editing) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar este registro?').then(res => {
        if (res.isConfirmed) {
          this.loading = true;
          if (this.photoFile) {
            this.afUpload.fileUpload(this.photoFile, this.builPathCollection());
            this.afUpload.percent$.pipe(
              finalize(() => this.afUpload.url$.subscribe(url => {
                this.form.get('photo').value.url = url;
                this.afProduct.update(this.form.value);
                this.loading = false;
              })))
              .subscribe(value => {
                this.percentage = parseInt(value.toString());
                if (this.percentage === 100) {
                  this.percentage = 0;
                }
              });
          } else {
            this.afProduct.update(this.form.value);
            this.loading = false;
          }
        }
      })
    }
  }

  private isEnableForm() {
    if (this.formValid() && this.loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  private verifyForm() {
    if (this.router.url === "/dashboard/products/edit") {
      this.product = this.afProduct.getProduct;
      if (this.product === undefined) {
        this.popup.alert = { active: true, type: 'info', text: 'Seleccione un producto antes de editar' };
        this.router.navigateByUrl('/dashboard/products');
      } else {
        this.form.setValue(this.product);
        this.btnDelete = this.form.get('photo').value.url ? true : false;
        this.editing = true;
      }
    }
  }

  valueCheck(field: string, value: string) {
    this.sub$ = this.afProduct.dataExist(field, value).pipe(map(res => {
      if (res.length > 0) {
        return res[0].payload.doc.id === this.form.get('id').value ? false : true;
      } else {
        return false;
      }
    })).subscribe(res => {
      if (field === 'code') {
        this.err.existCode = res;
        this.sub$.unsubscribe();
      }
      if (field === 'name') {
        this.err.existName = res;
        this.sub$.unsubscribe();
      }
    });
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  getPercentage(): string {
    return this.percentage.toString();
  }

  defaultImg(): string {
    return this.form.get('photo').value.url || './../../../assets/img/product.png'
  }

  private reload() {
    this.photoFile = null;
    this.btnDelete = false;
  }

  private builPathCollection(): string {
    let ext = this.photoFile.name.split('.');
    let name: string = ((this.form.get('name').value).replaceAll(' ', '-')).toLowerCase();
    return `products/${name}.${ext[ext.length - 1]}`;
  }

  onSelectPhoto(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      this.photoFile = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (data: ProgressEvent<FileReader>) => this.form.get('photo').value.url = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
      this.form.get('photo').value.path = this.builPathCollection();
      this.btnDelete = true;
      this.local = true;
    } else {
      this.reload();
    }
  }

  deletePhoto() {
    this.popup.smsConfirm('Atención', '¿Desea remover la imágen?').then(res => {
      if (res.isConfirmed) {
        if (this.editing && !this.local) {
          this.afUpload.fileDelete(this.form.get('photo').value.path)
            .then(() => this.afProduct.updatePhoto(this.product.id))
            .catch(err => this.popup.notification('error', `Ha ocurrido un error: ${err}`));
          this.form.get('photo').setValue({ path: '', url: '' });
          this.reload();
        } else {
          this.form.get('photo').setValue({ path: '', url: '' });
          this.reload();
        }
      }
    });
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

  formValid(): boolean {
    return (this.form.valid && !this.err.existCode && !this.err.existName) ? true : false;
  }
}