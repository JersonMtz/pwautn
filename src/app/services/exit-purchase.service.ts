import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MessagesService } from './messages.service';
import { PurchaseNewComponent } from '../pages/purchases/purchase-new/purchase-new.component';

@Injectable({
    providedIn: 'root'
})
export class ExitPurchaseService implements CanDeactivate<PurchaseNewComponent>
{

    constructor(private popup: MessagesService) { }

    canDeactivate(component: PurchaseNewComponent): any {
        if (component.headBill.provider && component.headBill.warehouse && component.product) {
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
