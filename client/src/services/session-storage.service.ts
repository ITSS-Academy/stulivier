import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  saveTokenInSession(idToken: string) {
    sessionStorage.setItem('idToken', idToken);
  }

  removeTokenInSession() {
    sessionStorage.removeItem('idToken');
  }

  getValueFromSession(key: string) {
    return sessionStorage.getItem(key) || '';
  }
}
