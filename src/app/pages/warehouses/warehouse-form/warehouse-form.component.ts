import { Component, Input } from '@angular/core';
import { WarehouseInterface } from 'src/app/models/warehouse.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'warehouse-form',
  templateUrl: './warehouse-form.component.html'
})
export class WarehouseFormComponent {

  form:FormGroup;
  expNumber:RegExp = /^([0-9])*$/;
  @Input('edit') editing:boolean = false;
  @Input('data') warehouse:WarehouseInterface;

  constructor(private fb:FormBuilder) { this.initForm(); }

  initForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.compose([ Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber) ])],
      direction: [''],
      status: ['', Validators.required]
    })
  }

  ngOnChanges() {
    if (this.editing) {
      this.form.setValue(this.warehouse);
    } else {
      this.form.reset();
    }
  }

  /* METHODS FORM */
  hasErrorName():boolean {
    return (this.form.controls['name'].errors && this.form.controls['name'].dirty)
  }

  hasErrorPhone():boolean {
    return (this.form.controls['phone'].errors && this.form.controls['phone'].dirty)
  }

  requiredPhone():boolean {
    return this.form.controls['phone'].errors.required;
  }

  patternPhone():boolean {
    return this.form.controls['phone'].errors.pattern;
  }

  incompletedPhone():boolean {
    return this.form.controls['phone'].errors.min;
  }

  formValid():boolean {
    return this.form.valid;
  }

}
