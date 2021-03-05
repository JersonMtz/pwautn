import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { ProductFormComponent } from '@pages/products/product-form/product-form.component';
import { MessagesService } from '@shared/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ExitProductService implements CanDeactivate<ProductFormComponent> 
{

  constructor(private popup:MessagesService){ }

  canDeactivate(component: ProductFormComponent):any {
    if (component.form.dirty || (component.form.get('photo').value.path)) {
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
