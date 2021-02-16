import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwt_key';
const USER_KEY = 'user_key';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }



  isLoggedIn(): boolean{
   return !!this.getToken();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}