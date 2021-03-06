import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderInterface } from '@models/provider.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProviderService } from '@pages/providers/services/afProvider.service';

@Component({
  selector: 'provider-form',
  templateUrl: './provider-form.component.html'
})
export class ProviderFormComponent implements OnChanges {

  form: FormGroup;
  expNumber: RegExp = /^([0-9])*$/;
  @Input('edit') editing: boolean = false;
  @Input('data') provider: ProviderInterface;
  @Output('ready') action: EventEmitter<boolean> = new EventEmitter();

  constructor(private afProvider: AfProviderService, private fb: FormBuilder, private popup: MessagesService) {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber)])],
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

  addProvider() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let data = this.form.value;
          delete data.id;
          this.afProvider.add(data);
          this.form.reset();
        }
      });
    }
  }

  updateProvider() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar este registro?').then(res => {
        if (res.isConfirmed) {
          this.afProvider.update(this.form.value);
          this.action.emit(false);
        }
      });
    }
  }

  /* METHODS FORM */
  hasErrorField(field: string): boolean {
    return (this.form.controls[field].errors && this.form.controls[field].dirty);
  }

  requiredField(field: string): boolean {
    return this.form.controls[field].errors.required;
  }

  incompleteField(field: string): boolean {
    return this.form.controls[field].errors.min;
  }

  patternField(field: string): boolean {
    return this.form.controls[field].errors.pattern;
  }

  formValid(): boolean {
    return this.form.valid;
  }
}
