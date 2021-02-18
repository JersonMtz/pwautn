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
  hasErrorIdCard():boolean {
    return (this.form.controls['idCard'].errors && this.form.controls['idCard'].dirty)
  }

  requiredIdCard():boolean {
    return this.form.controls['idCard'].errors.required;
  }

  incompletedIdCard():boolean {
    return this.form.controls['idCard'].errors.min;
  }

  patternIdCard():boolean {
    return this.form.controls['idCard'].errors.pattern;
  }

  hasErrorName():boolean {
    return (this.form.controls['name'].errors && this.form.controls['name'].dirty)
  }

  hasErrorSurname():boolean {
    return (this.form.controls['surname'].errors && this.form.controls['surname'].dirty)
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
