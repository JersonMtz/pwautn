import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../../../models/product.interface';
import { MessagesService } from '../../../services/messages.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnDestroy{
  
  productList:ProductInterface[] = [
    {
      id: 'a1A1',
      code: 'ABCD',
      name: 'Shampu',
      cost: 111,
      price: 1111,
      stock: 10,
      status: true,
      category: 'A1',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure sunt aut, unde, excepturi tempore quia sequi consectetur at eligendi',
      photo: 'https://www.vivalinda.es/wp-content/uploads/2020/06/productos-oxigenador-robson-10-vol-720x720-1.jpg' 
    },
    {
      id: 'b2B2',
      code: 'EFGH',
      name: 'Tinte',
      cost: 222,
      price: 2222,
      stock: 20,
      status: false,
      category: 'B2',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure sunt aut, unde, excepturi tempore quia sequi consectetur at eligendi',
      photo: 'https://www.inoar.es/wp-content/uploads/2019/09/productos-720x720-afro-vegan-kit.jpg' 
    },
    {
      id: 'c3C3',
      code: 'IJKL',
      name: 'Jabon',
      cost: 333,
      price: 3333,
      stock: 30,
      status: true,
      category: 'C3',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure sunt aut, unde, excepturi tempore quia sequi consectetur at eligendi',
      photo: '' 
    }
  ];

  constructor(private sms:MessagesService, 
              private productService:ProductService,
              private router:Router) {
    sms.showAlert();
    document.getElementById('a-product').classList.toggle('active');
  }

  ngOnDestroy() {
    document.getElementById('a-product').classList.toggle('active');
  }

  editProduct(product:ProductInterface) {
    this.productService.setProduct = product;
    this.router.navigateByUrl('/dashboard/products/edit');
  }

  deleteProduct(product:ProductInterface) {
    this.sms.smsDelete(product.name).then(resp => {
      if (resp.isConfirmed) {
        // TODO: BORRAR EN FIREBASE
        console.log('SE BORRO EN FIREBASE');
        this.sms.notification('success',`Se elimino a ${ product.name } con éxito`);
      }
    })
  }
}