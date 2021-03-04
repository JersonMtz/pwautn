import { AbstractControl } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import { AfClientService } from '@pages/clients/services/afClient.service';
import { AfProductService } from '@pages/products/services/afProduct.service';

export class Validator {
    static checkIdCard(http:AfClientService) {
        return (control:AbstractControl) => {
            return http.checkIdCard(control.value).pipe(
                first(),
                map(response => response.length > 0 ? { notEnable: true } : null)
            )
        }
    }

    static checkExist(field:string, http:AfProductService) {
        return (control:AbstractControl) => {
            return http.dataExist(field, control.value).pipe(
                first(),
                map(response => response.length > 0 ? { notEnable: true } : null)
            )
        }
    }
}