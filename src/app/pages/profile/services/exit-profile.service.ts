import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '../profile.component';
import { MessagesService } from '../../../shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class ExitProfileService implements CanDeactivate<ProfileComponent>
{

    constructor(private popup: MessagesService) { }

    canDeactivate(component: ProfileComponent): any {
                                //component.pathCollection
        if (component.form.dirty || component.btnReset) {
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
