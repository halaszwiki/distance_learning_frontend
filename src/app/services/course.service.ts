import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { CourseToUser} from '../models/courseToUser';


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

  saveCourse(course: Course): Observable<Course>{
    return this._httpClient.post<Course>(`${this.getUrl}/list`, course);
  }

  getCourse(id: number): Observable<Course>{
    return this._httpClient.get<Course>(`${this.getUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteCourse(id: number): Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
  }

  addCourseToUser(userIdAndCourse: CourseToUser): Observable<CourseToUser>{ 
    return this._httpClient.post<CourseToUser>(`${this.getUrl}/addCourseToUser`, userIdAndCourse);
  }
}
