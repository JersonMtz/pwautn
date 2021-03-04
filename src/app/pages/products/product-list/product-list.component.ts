import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnDestroy {

  items:BreadcrumbInterface[] = [
    {
      url: '/dashboard',
      icon: 'fas fa-home',
      title: 'Inicio'
    },
    {
      icon: 'fas fa-cubes',
      title: 'Productos'
    }
  ];
  
  productList:ProductInterface[] = [];
  private subscription$:Subscription;

  constructor(private sms:MessagesService, 
              private afProduct:AfProductService,
              private router:Router) {
    sms.showAlert();
    document.getElementById('a-product').classList.toggle('active');
    this.subscription$ = this.afProduct.list().subscribe(list => this.productList = list);
  }

  ngOnDestroy() {
    document.getElementById('a-product').classList.toggle('active');
    this.subscription$.unsubscribe();
  }

  editProduct(product:ProductInterface) {
    this.afProduct.setProduct = product;
    this.router.navigateByUrl('/dashboard/products/edit');
  }

  deleteProduct(product:ProductInterface) {
    this.sms.smsDelete(product.name).then(resp => {
      if (resp.isConfirmed) {
        // TODO: BORRAR EN FIREBASE
      }
    })
  }
}