import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { afAuthService } from '@auth/services/afAuth.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnDestroy {

  items: BreadcrumbInterface[] = [
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

  productList: ProductInterface[] = [];
  private sub$: Subscription[] = [];
  admin:boolean = false;

  constructor(public afAuth:afAuthService,
    private sms: MessagesService,
    private afProduct: AfProductService,
    private router: Router) {
    sms.showAlert();
    document.getElementById('a-product').classList.toggle('active');
    this.sub$.push(this.afProduct.list().subscribe(list => this.productList = list));
    this.sub$.push(this.afAuth.user$.subscribe(user => this.admin = user.role));
  }

  ngOnDestroy() {
    document.getElementById('a-product').classList.toggle('active');
    this.sub$.forEach(item => item.unsubscribe());
  }

  editProduct(product: ProductInterface) {
    this.afProduct.setProduct = product;
    this.router.navigateByUrl('/dashboard/products/edit');
  }

  deleteProduct(product: ProductInterface) {
    this.sms.smsDelete(product.name).then(resp => {
      if (resp.isConfirmed) {
        this.afProduct.delete(product);
      }
    })
  }
}