import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../ngrxs/auth/auth.state';
import { environment } from '../environments/environment';

@Injectable()
export class HttpClientAuth {
  idToken: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth', 'idToken').subscribe((token) => {
      if (token) {
        this.idToken = token;
      }
    });
  }

  private transformRequest(url: string, options: any) {
    let newUrl = '';

    newUrl = `${environment.apiUrl}/${url}`;

    return {
      url: newUrl,
      options: {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.idToken}`,
        }),
        ...options,
      },
    };
  }

  get(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.get(newUrl, newOptions);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.post(newUrl, body, newOptions);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.put(newUrl, body, newOptions);
  }

  delete(url: string, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.delete(newUrl, newOptions);
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    const { url: newUrl, options: newOptions } = this.transformRequest(
      url,
      options,
    );
    return this.http.patch(newUrl, body, newOptions);
  }
}
