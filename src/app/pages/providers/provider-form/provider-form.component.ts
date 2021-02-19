import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderInterface } from '../../../models/provider.interface';

@Component({
  selector: 'provider-form',
  templateUrl: './provider-form.component.html'
})
export class ProviderFormComponent implements OnChanges {

  form:FormGroup;
  expNumber:RegExp = /^([0-9])*$/;
  @Input('edit') editing:boolean = false;
  @Input('data') provider:ProviderInterface;

  constructor(private fb:FormBuilder) { this.initForm(); }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.compose([ Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber) ])],
      mail: ['', Validators.email],
      direction: ['']
    })
  }

  ngOnChanges() {
    if (this.editing) {
      this.form.setValue(this.provider);
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

  hasErrorMail():boolean {
    return (this.form.controls['mail'].errors && this.form.controls['mail'].dirty)
  }

  formValid():boolean {
    return this.form.valid;
  }
}
