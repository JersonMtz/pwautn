import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { ProductInterface } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnDestroy {

  form:FormGroup;
  private expNumber:RegExp = /^([0-9])*$/;
  private product:ProductInterface;
  edit:boolean = false;

  defaultPhoto:string;
  btnReset:boolean;

  /** File photo **/
  private namePhoto:string;
  private uploadPhoto:any;
  private pathCollection:string;

  constructor(private fb:FormBuilder, private productService:ProductService, private router:Router, private note:MessagesService) { 
    this.product = this.productService.getProduct;
    this.initForm(); 
    this.onResetPhoto();
  }

  private newProduct() {
    this.form = this.fb.group({
      code: [''],
      name: ['', Validators.required],
      cost: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      stock: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      category: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      photo: ['']
    });
  }

  private editProduct() {
    this.form = this.fb.group({
      code: [this.product.code || ''],
      name: [this.product.name, Validators.required],
      cost: [this.product.cost, Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      price: [this.product.price, Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      stock: [this.product.stock, Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
      category: [this.product.category, Validators.required],
      status: [this.product.status, Validators.required],
      description: [this.product.description || ''],
      photo: [this.product.photo || '']
    });
  }

  initForm() {
    if (this.router.url === "/dashboard/products/add") {
      this.edit = false;
      this.newProduct();
    } else {
      if (this.product === undefined) {
        this.note.error.active = true;
        this.note.error.text = 'Seleccione un producto antes de editar'
        this.router.navigateByUrl('/dashboard/products')
      } else {
        this.edit = true;
        this.editProduct();
      }
    }
  }

  //******** METHODS VALIDATORS NAME ********//
  hasErrorName():boolean {
    return (this.form.controls['name'].errors && this.form.controls['name'].dirty)
  }

  requiredName():boolean {
    return this.form.controls['name'].errors.required;
  }

  //******** METHODS VALIDATORS COST ********//
  hasErrorCost():boolean {
    return (this.form.controls['cost'].errors && this.form.controls['cost'].dirty)
  }

  requiredCost():boolean {
    return this.form.controls['cost'].errors.required;
  }

  patternCost():boolean {
    return this.form.controls['cost'].errors.pattern;
  }

  //******** METHODS VALIDATORS STOCK ********//
  hasErrorStock():boolean {
    return (this.form.controls['stock'].errors && this.form.controls['stock'].dirty)
  }

  requiredStock():boolean {
    return this.form.controls['stock'].errors.required;
  }

  patternStock():boolean {
    return this.form.controls['stock'].errors.pattern;
  }

  //******** METHODS VALIDATORS PRICE ********//
  hasErrorPrice():boolean {
    return (this.form.controls['price'].errors && this.form.controls['price'].dirty)
  }

  requiredPrice():boolean {
    return this.form.controls['price'].errors.required;
  }

  patternPrice():boolean {
    return this.form.controls['price'].errors.pattern;
  }

  //******** METHODS VALIDATORS STOCK ********//
  hasErrorCategory():boolean {
    return (this.form.controls['category'].errors && this.form.controls['category'].dirty)
  }

  requiredCategory():boolean {
    return this.form.controls['category'].errors.required;
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
    this.defaultPhoto = (this.edit && this.product.photo) ? this.product.photo :  '../../../../assets/img/product.png';
    this.uploadPhoto = null;
    this.pathCollection = null;
    this.btnReset = false;
  }

  ngOnDestroy() {
    this.productService.setProduct = undefined;
  }
}
