import { Component, Input, OnChanges } from '@angular/core';
import { CategoryInterface } from '../../../models/category.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnChanges {

  form:FormGroup;
  @Input('edit') editing:boolean = false;
  @Input('data') category:CategoryInterface;

  constructor(private fb:FormBuilder) { this.initForm() }

  initForm(){
    this.form = this.fb.group({
      id: ['', Validators.required ],
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
