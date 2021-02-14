import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../interfaces/product.interface';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
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
      photo: '../../../../assets/img/product.png' 
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
      photo: '../../../../assets/img/product.png' 
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
      photo: '../../../../assets/img/product.png' 
    }
  ]

  constructor(private sms:MessagesService) { }

  ngOnInit(): void {  }

  deleteProduct(product:ProductInterface) {
    this.sms.smsDelete(product.name).then(resp => {
      if (resp.isConfirmed) {
        console.log('SE BORRO EN FIREBASE');
        this.sms.notification('success',`Se elimino a ${ product.name } con éxito`);
      }
    })
  }
}