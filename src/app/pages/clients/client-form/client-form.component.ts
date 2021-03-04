import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientInterface } from '@models/client.interface';
import { AfClientService } from '@pages/clients/services/afClient.service';
import { MessagesService } from '@shared/services/messages.service';
import { Validator } from '@utils/validator.firebase';

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnChanges {

  form: FormGroup;
  expNumber: RegExp = /^([0-9])*$/;
  @Input('edit') editing: boolean = false;
  @Input('data') client: ClientInterface;
  @Output('ready') action: EventEmitter<boolean> = new EventEmitter();

  constructor(private afClient: AfClientService, private fb: FormBuilder, private popup: MessagesService) {
    this.initForm();
  }

  addClient() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let body = this.form.value;
          delete body.id;
          this.afClient.add(body);
          this.form.reset();
        }
      });
    }
  }

  updateClient() {
    if (this.updateFormValid()) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar este registro?').then(res => {
        if (res.isConfirmed) {
          let { idCard, ...body } = this.form.value;
          this.afClient.update(body);
          this.action.emit(false);
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      idCard: ['', Validators.compose([Validators.required, Validators.min(100000000), Validators.pattern(this.expNumber)]), Validator.checkIdCard(this.afClient)],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber)])],
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

  errorIdCard() {
    return this.form.controls['idCard'].hasError('notEnable');
  }

  formValid(): boolean {
    return this.form.valid;
  }

  updateFormValid(): boolean {
    return (!this.hasErrorField('name') && !this.hasErrorField('surname') && !this.hasErrorField('phone') && !this.hasErrorField('mail')) ? true : false;
  }
}
