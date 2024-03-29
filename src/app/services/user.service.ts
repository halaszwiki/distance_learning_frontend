import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators'
import { Course } from '../models/course';
import { Exam } from '../models/exam';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUrl: string = "/api/user";

  constructor(private _httpClient: HttpClient) { }

  getAllUser(): Observable<User[]>{
    return this._httpClient.get<User[]>(`${this.getUrl}/list`);
  }

  saveUser(user: User): Observable<User>{
    return this._httpClient.post<User>(`${this.getUrl}/list`, user);
  }

  getUser(id: number): Observable<User>{
    return this._httpClient.get<User>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteUser(id: number): Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
  }

  getExams(id: number): Observable<Exam[]>{
    return this._httpClient.get<Exam[]>(`${this.getUrl}/${id}/exams`)
  }

  getGrades(id: number): Observable<Grade[]>{
    return this._httpClient.get<Grade[]>(`${this.getUrl}/${id}/grades`)
  }
}
