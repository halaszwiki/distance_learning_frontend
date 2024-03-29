import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { CoursePayload} from '../models/coursePayload';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private getUrl: string = "/api/course";

  constructor(private _httpClient: HttpClient) { }

  getAllCourse(): Observable<Course[]>{
    return this._httpClient.get<Course[]>(`${this.getUrl}/list`).pipe(
      map(response => response)
    )
  }

  getMyCourses(id: number): Observable<Course[]>{
    return this._httpClient.get<Course[]>(`${this.getUrl}/myCourses/${id}`).pipe(
      map(response => response)
    )
  }

  getTimetable(id: number): Observable<Course[]>{
    return this._httpClient.get<Course[]>(`${this.getUrl}/timetable/${id}`).pipe(
      map(response => response)
    )
  }

  saveCourse(course: Course): Observable<Course>{
    return this._httpClient.post<Course>(`${this.getUrl}/list`, course);
  }

  getCourse(id: number): Observable<Course>{
    return this._httpClient.get<Course>(`${this.getUrl}/${id}`)
  }

  deleteCourse(id: number): Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
  }

  addCourseToUser(coursePayload: CoursePayload): Observable<CoursePayload>{ 
    return this._httpClient.post<CoursePayload>(`${this.getUrl}/addCourseToUser`, coursePayload);
  }

  removeUserFromCourse(coursePayload: CoursePayload): Observable<CoursePayload>{ 
    return this._httpClient.post<CoursePayload>(`${this.getUrl}/removeFromCourse`, coursePayload);
  }

  getUsersOnCourse(id: number): Observable<User[]>{ 
    return this._httpClient.get<User[]>(`${this.getUrl}/users/${id}`).pipe(
      map(response => response)
    );
  }
}
