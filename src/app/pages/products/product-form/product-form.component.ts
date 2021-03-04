import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validator } from "@utils/validator.firebase";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { CategoryInterface } from '@models/category.interface';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { AfCategoryService } from '@pages/category/services/afCategory.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnDestroy {

  errorEditCode:boolean = false;
  categoryList: CategoryInterface[] = [];
  editing: boolean = false;
  items: BreadcrumbInterface[];

  form: FormGroup;
  private expNumber: RegExp = /^([0-9])*$/;
  private product: ProductInterface;

  defaultPhoto: string;
  btnReset: boolean;

  /** File photo **/
  private namePhoto: string;
  private uploadPhoto: any;
  pathCollection: string;

  constructor(private fb:FormBuilder,
    private afProduct:AfProductService,
    private afCategory:AfCategoryService,
    private router:Router,
    private popup:MessagesService) {
    this.getCategories();
    this.initForm();
    this.verifyForm();
    this.onResetPhoto();
    this.buildBreadcrumb();
    document.getElementById('a-product').classList.toggle('active');
  }

  ngOnDestroy() {
    this.afProduct.setProduct = undefined;
    document.getElementById('a-product').classList.toggle('active');
  }

  private getCategories() {
    this.afCategory.list().subscribe(list => this.categoryList = list);
  }

  addProduct() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let { id, ...data } = this.form.value;
          this.afProduct.add(data);
        }
      })
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      code: ['', [], Validator.checkExist('code', this.afProduct)],
      name: ['', Validators.required, Validator.checkExist('name', this.afProduct)],
      cost: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      stock: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      category: ['', Validators.required],
      status: [true, Validators.required],
      description: [''],
      photo: ['']
    });
  }

  verifyForm() {
    if (this.router.url === "/dashboard/products/edit") {
      this.product = this.afProduct.getProduct;
      if (this.product === undefined) {
        this.popup.alert = { active: true, type: 'info', text: 'Seleccione un producto antes de editar' };
        this.router.navigateByUrl('/dashboard/products');
      } else {
        this.form.setValue(this.product);
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

  valueExist(field:string, value:string = ' ') {
    this.afProduct.dataExist(field, value).pipe(map(res => {
      if (res.length > 0) {
        return res[0].payload.doc.id === this.form.get('id').value ? false : true;
      } else {
        return false;
      }
    })).subscribe(res => this.errorEditCode = res);
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

  errorNameExist(field: string): boolean {
    return this.form.controls[field].hasError('notEnable');
  }

  formValid(): boolean {
    return this.form.valid;
  }

  //******** EXCHANGE  METHODS & UPLOAD PHOTO ********//
  public builNamePhoto() {
    let tem = `/${this.namePhoto}` || '';
    this.namePhoto = ((this.form.get('name').value).replaceAll(' ', '-')).toLowerCase();
    if (this.pathCollection) {
      this.pathCollection = this.pathCollection.replace(tem, `/${this.namePhoto}`);
    }
  }

  public onSelectPhoto(evt: any) {
    if (evt.target.files && evt.target.files[0]) {
      let nameFile = evt.target.files[0].name.split('.');
      this.uploadPhoto = evt.target.files[0];
      this.builNamePhoto();
      this.pathCollection = `products/${this.namePhoto}.${nameFile[nameFile.length - 1]}`;
      let reader = new FileReader();
      reader.onload = (data: ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
      this.btnReset = true;
    } else {
      this.onResetPhoto();
    }
  }

  public onResetPhoto() {
    this.defaultPhoto = (this.editing && this.product.photo) ? this.product.photo : '../../../../assets/img/product.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false;
  }
}
