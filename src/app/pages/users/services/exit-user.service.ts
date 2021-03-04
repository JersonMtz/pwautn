import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { UserFormComponent } from '@pages/users/user-form/user-form.component';
import { MessagesService } from '@shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class ExitUserService implements CanDeactivate<UserFormComponent>
{

    constructor(private popup: MessagesService) { }

    canDeactivate(component:UserFormComponent): any {
        if (component.form.dirty) {
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