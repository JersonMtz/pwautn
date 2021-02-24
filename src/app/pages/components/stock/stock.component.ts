import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';
import { MessagesService } from '../../../services/messages.service';


@Component({
  selector: 'stock',
  templateUrl: './stock.component.html'
})
export class StockComponent  {
  
  @Input('sale') typeAccion:boolean = true;

  listProduct:ProductInterface[] = [
    {
      id: 'a1',
      code: 'azK',
      name: 'azucar',
      cost: 1111,
      price: 2222,
      stock: 56
    },
    {
      id: 'B1',
      code: 'zal',
      name: 'sal',
      cost: 1111,
      price: 2222,
      stock: 13
    },
    {
      id: 'ak2',
      code: 'azK',
      name: 'leche',
      cost: 1111,
      price: 2222,
      stock: 50
    },
    {
      id: 'a1',
      code: 'azK',
      name: 'jabon',
      cost: 1111,
      price: 2222,
      stock: 50
    },
    {
      id: 'd5',
      code: 'kfe',
      name: 'cafe',
      cost: 1111,
      price: 2222,
      stock: 45
    }
  ];
  
  constructor(private popup:MessagesService) { }

  stockError(amount:number, product:ProductInterface) {
    if (amount > product.stock || amount < 0 || !amount) {
      product.error = true;
      this.popup.notification('error','Verifique la cantidad del pedido');
    } else {
      product.error = false;
    }
  }

  isNegative(amount:number, product:ProductInterface) {
    if (amount < 0 || !amount) {
      product.error = true;
      this.popup.notification('error','Verifique el precio del pedido');
    } else {
      product.error = false;
    }
  }

  addToBill(amount:number, product:ProductInterface) {
    // TODO: EMITIR EL OBJETO AL PADRE Y PASARLO AL COMPONENTE BILL
    if (product.stock === 0 && this.typeAccion) {
      this.popup.notification('info',`No hay  ${product.name} suficiente en stock`);
      product.error = true;
    } else {
      if (amount && amount > 0 && amount <= product.stock) {
        let tem:ProductInterface = {
          id: product.id,
          code: product.code,
          name: product.name,
          cost: product.cost,
          price: product.price,
          amount: Number(amount)
        };
        product.stock -= amount;
        this.popup.notification('success',`Se agrego ${product.name} a la factura`);
      } else {
        this.popup.notification('info',`Verifique la cantidad del producto ${product.name} antes de agregar a la factura`);
      }  
    }
  }

}
