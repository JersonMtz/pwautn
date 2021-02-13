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
  expNumber:RegExp = /^([0-9])*$/;

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

  formValid():boolean {
    return this.form.valid;
  }

}
