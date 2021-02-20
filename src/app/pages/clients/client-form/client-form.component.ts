import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientInterface } from '../../../models/client.interface';

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnChanges {
  
  form:FormGroup;
  expNumber:RegExp = /^([0-9])*$/;
  @Input('edit') editing:boolean = false;
  @Input('data') client:ClientInterface;

  constructor(private fb:FormBuilder) { this.initForm(); }

  // TODO: crear validación asincrona para la cédula
  initForm() {
    this.form = this.fb.group({
      id: [''],
      idCard: ['', Validators.compose([ Validators.required, Validators.min(100000000), Validators.pattern(this.expNumber) ])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.compose([ Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber) ])],
      mail: ['', Validators.email]
    })
  }

  ngOnChanges() {
    if (this.editing) {
      this.form.setValue(this.client);
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
