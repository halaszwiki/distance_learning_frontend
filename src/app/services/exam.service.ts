import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { Exam } from "../models/exam";
import { ExamPayload} from '../models/examPayload';
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
  })
  export class ExamService {
  
    private getUrl: string = "/api/exam";
  
    constructor(private _httpClient: HttpClient) { }
  
    getAllExam(): Observable<Exam[]>{
      return this._httpClient.get<Exam[]>(`${this.getUrl}/list`).pipe(
        map(response => response)
      )
    }
  
    saveExam(exam: Exam): Observable<Exam>{
      return this._httpClient.post<Exam>(`${this.getUrl}/list`, exam);
    }
  
    getExam(id: number): Observable<Exam>{
      return this._httpClient.get<Exam>(`${this.getUrl}/${id}`).pipe(
        map(response => response)
      )
    }
  
    deleteExam(id: number): Observable<any>{
      return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
    }
  
    addExamToUser(examPayload: ExamPayload): Observable<ExamPayload>{ 
      return this._httpClient.post<ExamPayload>(`${this.getUrl}/addExamToUser`, examPayload);
    }

    getUsersOnExam(id: number): Observable<User[]>{ 
      return this._httpClient.get<User[]>(`${this.getUrl}/users/${id}`).pipe(
        map(response => response)
      );
    }
  }