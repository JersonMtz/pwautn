import { Component, OnDestroy } from '@angular/core';
import { CategoryInterface } from 'src/app/models/category.interface';
import { MessagesService } from '../../../shared/services/messages.service';
import { BreadcrumbInterface } from 'src/app/models/breadcrumb.interface';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnDestroy{

  items:BreadcrumbInterface[] = [
    {
      url: '/dashboard',
      icon: 'fas fa-home',
      title: 'Inicio'
    },
    {
      url: '/dashboard/products',
      icon: 'fas fa-cubes',
      title: 'Productos'
    },
    {
      icon: 'fas fa-tags mt-1',
      title: 'Categoría'
    }
  ];

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

  constructor(private popup:MessagesService) { 
    document.getElementById('a-product').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-product').classList.toggle('active');
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
