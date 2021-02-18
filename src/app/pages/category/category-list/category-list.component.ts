import { Component, ChangeDetectorRef } from '@angular/core';
import { CategoryInterface } from 'src/app/models/category.interface';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent {

  edit:boolean = false;
  categoryEdit:CategoryInterface;
  categories:CategoryInterface[] = [
    {
      id: 'abcd',
      name: 'Shampues',
      detail: 'Lorem isump'
    },
    {
      id: 'efgh',
      name: 'Tintes',
      detail: 'Lorem isump'
    },
    {
      id: 'ijkl',
      name: 'Cremas',
      detail: 'Lorem isump'
    }
  ];

  constructor(private dect:ChangeDetectorRef, private popup:MessagesService) { }

  ngAfterViewChecked() {
    this.dect.detectChanges();
  }

  editCategory(category:CategoryInterface) {
    this.edit = true;
    this.categoryEdit = category;
  }
  
  deleteCategory(category:CategoryInterface) {
    this.popup.smsDelete(category.name).then(resp => {
      if (resp.isConfirmed) {
        //TODO: LÓGICA ELIMINAR EN FIREBASE 
        this.popup.notification('success', `Se elimino a ${ category.name } con éxito`);
      }
    });
  }
  
  reload() {
    if (this.edit){ 
      setTimeout(() => this.edit = false, 500);
    }
  }
}
