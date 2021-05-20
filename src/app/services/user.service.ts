import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUrl: string = "/api/user";
  currentUser: User;

  constructor(private _httpClient: HttpClient) { }

  getAllUser(): Observable<User[]>{
    return this._httpClient.get<User[]>(`${this.getUrl}/list`);
  }

  saveUser(course: User): Observable<User>{
    return this._httpClient.post<User>(`${this.getUrl}/list`, course);
  }

  getUser(id: number): Observable<User>{
    return this._httpClient.get<User>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteUser(id: number): Observable<any>{
return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
  }


}
