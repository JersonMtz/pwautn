import { Component, Input } from '@angular/core';
import { TaxInterface } from '../../../models/tax.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tax-form',
  templateUrl: './tax-form.component.html'
})
export class TaxFormComponent {

  form:FormGroup;
  expNumber:RegExp = /^([0-9])*$/;
  @Input('edit') editing:boolean = false;
  @Input('data') tax:TaxInterface;

  constructor(private fb:FormBuilder) { this.initForm(); }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      value: ['', Validators.compose([ Validators.required, Validators.pattern(this.expNumber) ])],
      status: ['', Validators.required]
    })
  }

  ngOnChanges() {
    if (this.editing) {
      this.form.setValue(this.tax);
    } else {
      this.form.reset();
      this.form.controls['status'].setValue(true);
    }
  }

  /* METHODS FORM */
  hasErrorName():boolean {
    return (this.form.controls['name'].errors && this.form.controls['name'].dirty)
  }

  hasErrorValue():boolean {
    return (this.form.controls['value'].errors && this.form.controls['value'].dirty)
  }

  requiredValue():boolean {
    return this.form.controls['value'].errors.required;
  }

  patternValue():boolean {
    return this.form.controls['value'].errors.pattern;
  }

  formValid():boolean {
    return this.form.valid;
  }

}
