import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ProductInterface } from '@models/product.interface';
import { MessagesService } from '@shared/services/messages.service';
import { AfProductService } from '@pages/products/services/afProduct.service';
import { from, Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnChanges, OnDestroy {

  private sub$: Subscription;
  cols: any;
  @Input('delete') productDelete: ProductInterface;
  @Input('sale') typeAccion: boolean = true;
  @Output('order') productOut: EventEmitter<ProductInterface> = new EventEmitter();

  listProduct: ProductInterface[] = [];

  constructor(private afProduct: AfProductService,
    private primeng: PrimeNGConfig,
    private popup: MessagesService) {
    this.primeng.ripple = true;
    this.header();
  }

  ngOnInit() {
    this.sub$ = this.afProduct.list().subscribe(list => {
      if (this.typeAccion) {
        const data = from<ProductInterface[]>(list).pipe(filter(p => p.price > 0));
        data.subscribe(res => this.listProduct.push(res));
      } else {
        this.listProduct = list;
      }
    });
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
      this.popup.notification('error', '<span class="text-white">Verifique la cantidad del producto</span>', '#E6242B');
    } else {
      product.error = false;
    }
  }

  isNegative(amount: number, product: ProductInterface) {
    if (amount < 0 || !amount) {
      product.error = true;
      this.popup.notification('error', '<span class="text-white">Verifique el precio del producto</span>', '#E6242B');
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
      this.popup.notification('info', `<span class="text-white">No hay  ${product.name.toUpperCase()} suficiente en stock</span>`, '#2799F3');
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
        this.popup.notification('success', `<span class="text-white">Se agrego ${product.name.toUpperCase()} a la factura</span>`, '#52B256');
      } else {
        this.popup.notification('info', `<span class="text-white">Verifique la cantidad del producto ${product.name.toUpperCase()}</span>`, '#2799F3');
      }
    }
  }

  private header() {
    this.cols = [
      { field: 'code', header: 'Código' },
      { field: 'product', header: 'Producto' },
      { field: 'stock', header: 'Stock' },
      { field: 'amount', header: 'Cantidad' },
    ]
  }

}
