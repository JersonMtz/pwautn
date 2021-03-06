import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '@pages/profile/profile.component';
import { MessagesService } from '@shared/services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class ExitProfileService implements CanDeactivate<ProfileComponent>
{

    constructor(private popup: MessagesService) { }

    canDeactivate(component: ProfileComponent): any {
        if (component.form.dirty || component.photoFile) {
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
