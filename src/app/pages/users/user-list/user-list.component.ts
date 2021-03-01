import { Component } from '@angular/core';
import { UserService } from 'src/app/pages/users/services/user.service';
import { UserInterface } from '../../../models/user.interface';
import { Router } from '@angular/router';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {

  userList:UserInterface[] = [
    {
      id:'A1',
      name: 'Persona 1',
      surname:'App1',
      status: true,
      role: true,
      mail: 'persona1@mail.com',
      photo: 'data:image/jpeg;base64,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',
      created: '2021-01-12'
    },
    {
      id:'B2',
      name: 'Persona 2',
      surname:'App2',
      status: true,
      role: false,
      mail: 'persona2@mail.com',
      photo:'',
      created: '2021-01-12'
    },
    {
      id:'C3',
      name: 'Persona 3',
      surname:'App3',
      status: false,
      role: false,
      mail: 'persona3@mail.com',
      photo: 'https://wartimeni.com/wp-content/uploads/sites/34/2017/12/wwiini-avatar-04.jpg',
      created: '2021-01-12'
    }
  ];

  constructor(private sms:MessagesService, 
              private userService:UserService, 
              private router:Router) {
    sms.showAlert();
  }

  editUser(user:UserInterface) {
    this.userService.setUser = user;
    this.router.navigateByUrl('/dashboard/users/edit');
  }

  deleteUser(user:UserInterface) {
    this.sms.smsDelete(user.name).then(resp => {
      if (resp.isConfirmed) {
        // TODO: BORRAR EN FIREBASE
        console.log('SE BORRO EN FIREBASE');
        this.sms.notification('success',`Se elimino a ${ user.name } con éxito`);
      }
    })
  }
}
