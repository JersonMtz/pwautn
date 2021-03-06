import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxInterface } from '@models/tax.interface';
import { AfTaxService } from '@pages/taxes/services/afTax.service';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'tax-form',
  templateUrl: './tax-form.component.html'
})
export class TaxFormComponent {

  form: FormGroup;
  expNumber: RegExp = /^([0-9])*$/;
  @Input('edit') editing: boolean = false;
  @Input('data') tax: TaxInterface;
  @Output('ready') action: EventEmitter<boolean> = new EventEmitter();

  constructor(private afTax: AfTaxService, private fb: FormBuilder, private popup: MessagesService) { this.initForm(); }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      value: ['', Validators.compose([Validators.required, Validators.pattern(this.expNumber)])],
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

  addTax() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let data = this.form.value;
          delete data.id;
          this.afTax.add(data);
          this.form.reset();
          this.form.get('status').setValue(true);
        }
      });
    }
  }

  updateTax() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar este registro?').then(res => {
        if (res.isConfirmed) {
          this.afTax.update(this.form.value);
          this.action.emit(false);
        }
      });
    }
  }

  /* METHODS FORM */
  hasErrorField(field: string): boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty)
  }

  requiredField(field: string): boolean {
    return this.form.controls[field].errors.required;
  }

  patternField(field: string): boolean {
    return this.form.controls[field].errors.pattern;
  }

  formValid(): boolean {
    return this.form.valid;
  }

}
