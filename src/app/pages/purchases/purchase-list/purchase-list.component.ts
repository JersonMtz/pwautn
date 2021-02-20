import { Component } from '@angular/core';
import { PurchaseInterface } from '../../../models/purchase.interface';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent {

  purchaseLIst:PurchaseInterface[] = [
    {
      id: 'A1',
      date: '2021-02-02',
      total: 2345,
      client: 'Cliente 1',
      user: 'user 1',
      products: [
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
      ]
    },
    {
      id: 'A1',
      date: '2021-02-02',
      total: 2345,
      client: 'Cliente 1',
      user: 'user 1',
      products: [
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
      ]
    },
    {
      id: 'A1',
      date: '2021-02-02',
      total: 2345,
      client: 'Cliente 1',
      user: 'user 1',
      products: [
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
      ]
    }
  ]

  constructor() { }

}
