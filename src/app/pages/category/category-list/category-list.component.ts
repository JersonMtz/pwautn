import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { CategoryInterface } from '@models/category.interface';
import { AfCategoryService } from '@pages/category/services/afCategory.service';
import { MessagesService } from '@shared/services/messages.service';
import { Subscription } from 'rxjs';
import { afAuthService } from '../../../auth/services/afAuth.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../../products/product-list/product-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit, OnDestroy {

  private itemHtml: any;
  items: BreadcrumbInterface[] = [
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
  edit: boolean = false;
  show: boolean = true;
  categoryEdit: CategoryInterface;
  categoryList: CategoryInterface[] = [];
  private sub$: Subscription;
  cols: any;

  constructor(public afAuth: afAuthService,
    private afCategory: AfCategoryService,
    private popup: MessagesService) {
    this.sub$ = this.afCategory.list().subscribe(list => this.categoryList = list);
    this.header();
  }

  ngAfterViewInit() {
    this.itemHtml = document.getElementById('a-product');
    if (this.itemHtml) {
      this.itemHtml.classList.add('active');
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
    if (this.itemHtml) {
      this.itemHtml.classList.remove('active');
    }
  }

  editCategory(category: CategoryInterface) {
    this.show = false;
    this.edit = true;
    this.categoryEdit = category;
  }

  deleteCategory(category: CategoryInterface) {
    this.popup.smsDelete(category.name).then(resp => {
      if (resp.isConfirmed) {
        this.afCategory.delete(category);
      }
    });
  }

  showTab() {
    this.show = true;
    if (this.edit) {
      setTimeout(() => {
        this.edit = false;
      }, 500);
    }
  }

  private header() {
    this.cols = [
      { field: 'name', header: 'Categoría' },
      { field: 'detail', header: 'Detalles' }
    ];
  }
}
