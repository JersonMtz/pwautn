import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { WarehouseInterface } from '@models/warehouse.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../../shared/services/messages.service';
import { AfWarehouseService } from '../services/afWarehouse.service';

@Component({
  selector: 'warehouse-form',
  templateUrl: './warehouse-form.component.html'
})
export class WarehouseFormComponent implements OnChanges {

  form: FormGroup;
  expNumber: RegExp = /^([0-9])*$/;
  @Input('edit') editing: boolean = false;
  @Input('data') warehouse: WarehouseInterface;
  @Output('ready') action: EventEmitter<boolean> = new EventEmitter();

  constructor(private afWarehouse: AfWarehouseService, private fb: FormBuilder, private popup: MessagesService) {
    this.initForm();
  }

  addWarehouse() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let data = this.form.value;
          delete data.id;
          this.afWarehouse.add(data);
          this.form.reset();
        }
      });
    }
  }

  updateWarehouse() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar los datos de este registro?').then(res => {
        if (res.isConfirmed) {
          this.afWarehouse.update(this.form.value);
          this.action.emit(false);
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.min(10000000), Validators.pattern(this.expNumber)])],
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
