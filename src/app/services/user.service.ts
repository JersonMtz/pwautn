import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:UserInterface;

  constructor() { }

  set setUser(user:UserInterface) {
    this.user = user;
  }

  get getUser():UserInterface {
    return this.user;
  }
}
