import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClientAuth) {}

  getAllHistory(userId: string) {
    return this.http.get(`history?userId=${userId}`);
  }
}
