import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '../../products/services/afProduct.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnChanges, OnDestroy {

  private sub$: Subscription;
  @Input('delete') productDelete: ProductInterface;
  @Input('sale') typeAccion: boolean = true;
  @Output('order') productOut: EventEmitter<ProductInterface> = new EventEmitter();


  listProduct: ProductInterface[] = [];

  constructor(private afProduct: AfProductService,
    private popup: MessagesService) {
    this.sub$ = this.afProduct.list().subscribe(list => this.listProduct = list);
  }

  ngOnChanges() {
    this.returnProduct();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
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

  stockError(amount: number, product: ProductInterface) {
    if ((amount > product.stock && this.typeAccion) || amount < 0 || !amount) {
      product.error = true;
      this.popup.notification('error', 'Verifique la cantidad del pedido');
    } else {
      product.error = false;
    }
  }

  isNegative(amount: number, product: ProductInterface) {
    if (amount < 0 || !amount) {
      product.error = true;
      this.popup.notification('error', 'Verifique el precio del pedido');
    } else {
      product.error = false;
      if (this.typeAccion) {
        product.price = amount;
      } else {
        product.cost = amount;
      }
    }
  }

  addToBill(amount: number, product: ProductInterface) {
    if (product.stock === 0 && this.typeAccion) {
      this.popup.notification('info', `No hay  ${product.name} suficiente en stock`);
      product.error = true;
    } else {
      if (amount && amount > 0) {
        let tem: ProductInterface = {
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
        this.popup.notification('success', `Se agrego ${product.name.toUpperCase()} a la factura`);
      } else {
        this.popup.notification('info', `Verifique la cantidad del producto ${product.name.toUpperCase()} antes de agregar a la factura`);
      }
    }
  }

}
