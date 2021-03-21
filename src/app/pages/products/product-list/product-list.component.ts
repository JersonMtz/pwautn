import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbInterface } from '@models/breadcrumb.interface';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { afAuthService } from '@auth/services/afAuth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnDestroy {

  private itemHtml: any;
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
  admin: boolean = false;
  cols: any;

  constructor(private afAuth: afAuthService,
    private primeng: PrimeNGConfig,
    private sms: MessagesService,
    private afProduct: AfProductService,
    private router: Router) {
    sms.showAlert();
    this.sub$.push(this.afAuth.user$.subscribe(user => this.admin = user.role));
    this.sub$.push(this.afProduct.list().subscribe(list => this.productList = list));
    this.primeng.ripple = true;
    this.header();
  }

  ngAfterViewInit() {
    this.itemHtml = document.getElementById('a-product');
    if (this.itemHtml) {
      this.itemHtml.classList.add('active');
    }
  }

  ngOnDestroy() {
    this.sub$.forEach(item => item.unsubscribe());
    if (this.itemHtml) {
      this.itemHtml.classList.remove('active');
    }
  }

  private header() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'image', header: 'Imagén' },
      { field: 'name', header: 'Producto' },
      { field: 'status', header: 'Disponible' },
      { field: 'stock', header: 'Stock' },
      { field: 'price', header: 'Precio' }
    ];
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