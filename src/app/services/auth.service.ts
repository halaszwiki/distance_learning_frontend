import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';

const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(private http: HttpClient) { }

    login(credentials): Observable<any> {
      return this.http.post(AUTH_API + 'signin', {
        username: credentials.username,
        password: credentials.password
      }, httpOptions);
    }
  
    register(user): Observable<any> {
      return this.http.post(AUTH_API + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.roles,
      }, httpOptions);
    }
  }