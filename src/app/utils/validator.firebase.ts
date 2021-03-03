import { AbstractControl } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import { AfClientService } from '../pages/clients/services/afClient.service';

export class Validator {
    static checkIdCard(http:AfClientService) {
        return (control:AbstractControl) => {
            return http.checkIdCard(control.value).pipe(
                first(),
                map(response => response.length > 0 ? { notEnable: true } : null)
            )
        }
    }
}