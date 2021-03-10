import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '@models/user.interface';
import { AfUserService } from '@pages/users/services/afUser.service';
import { MessagesService } from '@shared/services/messages.service';
import { afAuthService } from '../../../auth/services/afAuth.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {

  constructor(public afAuth:afAuthService,
    public afUser: AfUserService,
    private popup: MessagesService,
    private router: Router) {
    this.popup.showAlert();
  }

  editUser(user: UserInterface) {
    this.afUser.setUser = user;
    this.router.navigateByUrl('/dashboard/users/edit');
  }

  deleteUser(user: UserInterface) {
    this.popup.smsDelete(user.name, 'Para eliminar la cuenta como administrador visite el módulo de autenticación de <a href="https://console.firebase.google.com/" target="_blank">Firebase.</a>').then(resp => {
      if (resp.isConfirmed) {
        this.afUser.delete(user);
      }
    })
  }
}
