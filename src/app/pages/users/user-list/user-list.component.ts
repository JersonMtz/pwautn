import { Component } from '@angular/core';
import { UserInterface } from '../../../models/user.interface';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {

  userList:UserInterface[] = [
    {
      id:'A1',
      uid:'AA',
      name: 'Persona 1',
      surname:'App1',
      status: true,
      role: true,
      mail: 'persona1@mail.com',
      created: '2021-01-12'
    },
    {
      id:'B2',
      uid:'BB',
      name: 'Persona 2',
      surname:'App2',
      status: true,
      role: false,
      mail: 'persona2@mail.com',
      created: '2021-01-12'
    },
    {
      id:'C3',
      uid:'CC',
      name: 'Persona 3',
      surname:'App3',
      status: false,
      role: false,
      mail: 'persona3@mail.com',
      created: '2021-01-12'
    }
  ];

  constructor() { }

}
