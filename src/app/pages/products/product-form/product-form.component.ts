import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { ProductInterface } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnDestroy {

  form:FormGroup;
  private expNumber:RegExp = /^([0-9])*$/;
  private product:ProductInterface;
  editing:boolean = false;

  defaultPhoto:string;
  btnReset:boolean;

  /** File photo **/
  private namePhoto:string;
  private uploadPhoto:any;
  pathCollection:string;

  constructor(private fb:FormBuilder, 
              private productService:ProductService, 
              private router:Router, 
              private sms:MessagesService) { 
    this.product = this.productService.getProduct;
    this.initForm();
    this.verifyForm();
    this.onResetPhoto();
  }

  //TODO: en categoria hay que traer los datos de la coleccion, validar nombre de producto unico
  initForm() {
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
      photo: ['']
    });
  }

  verifyForm() {
    if (this.router.url === "/dashboard/products/edit") {
      if (this.product === undefined) {
        this.sms.alert = {active : true, type: 'info', text: 'Seleccione un producto antes de editar' };
        this.router.navigateByUrl('/dashboard/products');
      } else {
        this.form.setValue(this.product);
        this.editing = true;
      }
    }
  }

  /* METHODS FORM */
  hasErrorField(field:string):boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty);
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
    this.defaultPhoto = (this.editing && this.product.photo)? this.product.photo : '../../../../assets/img/product.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false;
  }

  ngOnDestroy() {
    this.productService.setProduct = undefined;
  }
}
