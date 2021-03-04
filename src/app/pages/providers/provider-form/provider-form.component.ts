import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderInterface } from '@models/provider.interface';

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
