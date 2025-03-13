import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClientAuth) {}

  createUser() {
    return this.http.post(`users`, '');
  }

  getUser() {
    return this.http.get(`users`);
  }

  getUserById(userId: string) {
    return this.http.get(`users/user`, {
      params: {
        userId: userId,
      },
    });
  }

  updateChannelImage(channelImg: File, userId: string) {
    const formData = new FormData();
    formData.append('file', channelImg);
    formData.append('userId', JSON.stringify(userId));
    return this.http.post(`users/channel`, formData);
  }

  updateAvatar(avatar: File, userId: string) {
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('userId', JSON.stringify(userId));
    return this.http.post(`users/avatar`, formData);
  }

  updateDescribe(userId: string, describe: string) {
    return this.http.post(`users/describe`, { userId, describe });
  }
}
