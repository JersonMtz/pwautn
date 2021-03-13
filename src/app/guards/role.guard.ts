import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { afAuthService } from '@auth/services/afAuth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private auth: afAuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            map(user => user.role),
            tap((admin) => {
                if (!admin) {
                    this.router.navigateByUrl('/dashboard');
                    return false;
                }
            })
        );
    }

}
