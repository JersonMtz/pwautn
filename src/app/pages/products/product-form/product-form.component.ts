import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent {

  form:FormGroup;
  private expNumber:RegExp = /^([0-9])*$/;
  defaultPhoto:string = '../../../../assets/img/product.png';
  btnReset:boolean = false;
  private namePhoto:string;
  private photoUpload:any;
  private pathCollection:string;

  constructor(private fb:FormBuilder) { this.initForm() }

  initForm() {
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
    let tem = this.namePhoto || '';
    this.namePhoto = ((this.form.get('name').value).replace(' ','-')).toLowerCase();
    if (this.pathCollection) {
      this.pathCollection = this.pathCollection.replace(tem, this.namePhoto);
    }
  }

  private updateFilePhoto(evt:any) {
    let nameFile = evt.target.files[0].name.split('.');
    this.photoUpload = evt.target.files[0];
    this.pathCollection = `products/${ this.namePhoto }.${ nameFile[nameFile.length - 1] }`;  
  }

  public onResetPhoto() {
    this.defaultPhoto = '../../../../assets/img/product.png';
    this.btnReset = false;
  }

  public onSelectPhoto(evt:any) {
    console.log('SE ACTIVO');
    
    if (evt.target.files && evt.target.files[0]) {
      this.updateFilePhoto(evt);
      let reader = new FileReader();
      reader.onload = (data:ProgressEvent<FileReader>) => this.defaultPhoto = (data.target.result).toString();
      reader.readAsDataURL(evt.target.files[0]);
      this.btnReset = true;
    } else {
      this.onResetPhoto();
    }
  }
}
