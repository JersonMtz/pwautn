import { Component, OnDestroy } from '@angular/core';
import { BillInterface } from '@models/bill.interface';
import { AfInventoryService } from '@pages/components/services/afInventory.service';
import { MessagesService } from '@shared/services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { afAuthService } from '@auth/services/afAuth.service';
import { AfProductService } from '@pages/products/services/afProduct.service';

@Component({
  selector: 'purchase-list',
  templateUrl: './purchase-list.component.html'
})
export class PurchaseListComponent implements OnDestroy {

  form: FormGroup;
  billView: BillInterface = {
    date: 0,
    warehouse: '',
    provider: '',
    status: false,
    tax: 0,
    subTotal: 0,
    products: []
  }

  constructor(public afAuth: afAuthService,
    public afPurchase: AfInventoryService,
    private afProduct: AfProductService,
    private fb: FormBuilder,
    private popup: MessagesService) {
    document.getElementById('a-purchase').classList.toggle('active');
    this.afPurchase.collectionPurchase();
    this.form = this.fb.group({ id: [''], status: [false, Validators.required] });
  }

  ngOnDestroy() {
    document.getElementById('a-purchase').classList.toggle('active');
  }

  showBill(bill: BillInterface) {
    this.billView = JSON.parse(JSON.stringify(bill));
    this.form.get('id').setValue(this.billView.id);
    this.form.get('status').setValue(this.billView.status);
  }

  deleteBill(bill: BillInterface) {
    this.popup.smsDelete('registro de compra', 'Recuerde mantener actualizado el stock de productos').then(res => {
      if (res.isConfirmed) {
        this.afPurchase.deletePurchase(bill);
      }
    })
  }

  updateBill() {
    this.popup.smsConfirm('Atención', '¿Desea actualizar el estado del pedido de compra?').then(res => {
      if (res.isConfirmed) {
        this.afPurchase.updatePurchase(this.form.get('id').value, this.form.get('status').value);
        const list = JSON.parse(JSON.stringify(this.billView.products));
        this.afProduct.updateStock(list);
        this.billView.status = true;
      }
    })
  }

  message(): string {
    if (!this.form.get('status').value) {
      return '<span class="alert-warning p-2 rounded animate__animated animate__fadeIn">Pedido pendiente</span>'
    } else {
      return '<span class="alert-success p-2 rounded animate__animated animate__fadeIn">Pedido procesado</span>'
    }
  }

  calculeTotal(sub: number, tax: number): number {
    return sub + (sub * (tax / 100));
  }
}
