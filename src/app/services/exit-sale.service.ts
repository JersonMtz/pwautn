import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MessagesService } from './messages.service';
import { SaleNewComponent } from '../pages/sales/sale-new/sale-new.component';

@Injectable({
    providedIn: 'root'
})
export class ExitSaleService implements CanDeactivate<SaleNewComponent>
{

    constructor(private popup: MessagesService) { }

    canDeactivate(component: SaleNewComponent): any {
        if (component.headBill.client || component.headBill.date || component.product) {
            return this.popup.smsConfirm().then((resp) => {
                if (resp.value) {
                    return true;
                } else {
                    return false;
                }
            })
        } else {
            return true;
        }
    }
}
