import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryInterface } from '@models/category.interface';
import { AfCategoryService } from '@pages/category/services/afCategory.service';
import { MessagesService } from '@shared/services/messages.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnChanges {

  form: FormGroup;
  @Input('edit') editing: boolean = false;
  @Input('data') category: CategoryInterface;
  @Output('ready') action: EventEmitter<boolean> = new EventEmitter();

  constructor(private afCategory: AfCategoryService, private fb: FormBuilder, private popup: MessagesService) {
    this.initForm();
  }

  addCategory() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea guardar este registro?').then(res => {
        if (res.isConfirmed) {
          let data = this.form.value;
          delete data.id;
          this.afCategory.add(data);
          this.form.reset();
        }
      });
    }
  }

  updateCategory() {
    if (this.formValid()) {
      this.popup.smsConfirm('Atención', '¿Desea actualizar los datos de este registro?').then(res => {
        if (res.isConfirmed) {
          this.afCategory.update(this.form.value);
          this.action.emit(false);
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      detail: ['']
    })
  }

  ngOnChanges() {
    if (this.editing) {
      this.form.setValue(this.category);
    } else {
      this.form.reset();
    }
  }

  /* METHODS FORM */
  hasErrorName(): boolean {
    return (this.form.get('name').errors && this.form.get('name').dirty);
  }

  formValid() {
    return this.form.valid;
  }
}
