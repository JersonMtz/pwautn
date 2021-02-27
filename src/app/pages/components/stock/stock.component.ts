import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductInterface } from '../../../models/product.interface';
import { MessagesService } from '../../../services/messages.service';


@Component({
  selector: 'stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnChanges  {

  @Input('delete') productDelete:ProductInterface;
  @Input('sale') typeAccion:boolean = true;
  @Output('order') productOut:EventEmitter<ProductInterface> = new EventEmitter();

  // TODO: obtener datos desde firebase
  listProduct:ProductInterface[] = [
    {
      id: 'a1',
      code: 'azK',
      name: 'azucar',
      cost: 1000,
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
      id: 'a14',
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

  ngOnChanges() {
    this.returnProduct();
  }

  returnProduct() {
    if (this.productDelete) {
      for (const item of this.listProduct) {
        if (item.id === this.productDelete.id) {
          item.stock += this.productDelete.amount;
          this.productDelete = undefined;
          break;
        }
      }
    }
  }

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
      if (this.typeAccion) {
        product.price = amount;
      } else {
        product.cost = amount;
      }
    }
  }

  addToBill(amount:number, product:ProductInterface) {
    if (product.stock === 0 && this.typeAccion) {
      this.popup.notification('info',`No hay  ${product.name} suficiente en stock`);
      product.error = true;
    } else {
      if (amount && amount > 0 && amount <= product.stock) {
        let tem:ProductInterface = {
          id: product.id,
          code: product.code,
          name: product.name,
          price: this.typeAccion ? product.price : product.cost,
          amount: Number(amount),
          total: this.typeAccion ? product.price * amount : product.cost * amount,
        };
        if (this.typeAccion) {
          product.stock -= amount;
        }
        this.productOut.emit(tem);
        this.popup.notification('success',`Se agrego ${product.name.toUpperCase()} a la factura`);
      } else {
        this.popup.notification('info',`Verifique la cantidad del producto ${product.name.toUpperCase()} antes de agregar a la factura`);
      }  
    }
  }

}
