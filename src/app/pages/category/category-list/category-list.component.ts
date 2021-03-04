import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { CategoryInterface } from '@models/category.interface';
import { AfCategoryService } from '@pages/category/services/afCategory.service';
import { MessagesService } from '@shared/services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnDestroy {

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
  show:boolean = true;
  categoryEdit:CategoryInterface;
  categoryList:CategoryInterface[] = [];
  private subscription$:Subscription;

  constructor(private afCategory:AfCategoryService, private popup:MessagesService) { 
    document.getElementById('a-product').classList.toggle('active');
    this.subscription$ = this.afCategory.list().subscribe(list => this.categoryList = list);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    document.getElementById('a-product').classList.toggle('active');
  }

  editCategory(category:CategoryInterface) {
    this.show = false;
    this.edit = true;
    this.categoryEdit = category;
  }
  
  deleteCategory(category:CategoryInterface) {
    this.popup.smsDelete(category.name).then(resp => {
      if (resp.isConfirmed) {
        this.afCategory.delete(category);
      }
    });
  }
  
  showTab() {
    this.show = true;
    if (this.edit){ 
      setTimeout(() => { 
        this.edit = false;
      }, 500);
    }
  }
}
