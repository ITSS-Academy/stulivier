import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClientAuth) {}

  createUser() {
    return this.http.post(`users`, '');
  }

  updateUser(updateUserDto: UserModel) {
    return this.http.patch(`users`, updateUserDto);
  }

  getUserById() {
    return this.http.get(`users`);
  }
}
