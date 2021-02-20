import { Component, OnChanges, Input } from '@angular/core';
import { WarehouseInterface } from 'src/app/models/warehouse.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'warehouse-form',
  templateUrl: './warehouse-form.component.html'
})
export class WarehouseFormComponent implements OnChanges {

  form:FormGroup;
  expNumber:RegExp = /^([0-9])*$/;
  @Input('edit') editing:boolean = false;
  @Input('data') warehouse:WarehouseInterface;

  constructor(private fb:FormBuilder) { this.initForm(); }

  initForm() {
    this.form = this.fb.group({
      id: [''],
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
      this.form.controls['status'].setValue(true);
    }
  }

  /* METHODS FORM */
  hasErrorField(field:string):boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty);
  }

  requiredField(field:string):boolean {
    return this.form.controls[field].errors.required;
  }

  incompleteField(field:string):boolean {
    return this.form.controls[field].errors.min;
  }

  patternField(field:string):boolean {
    return this.form.controls[field].errors.pattern;
  }

  formValid():boolean {
    return this.form.valid;
  }

}
