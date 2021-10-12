import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CourseToUser } from 'src/app/models/courseToUser';

import { CourseService } from 'src/app/services/course.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course = new Course();
  user: User = new User();
  

  constructor(private _courseService: CourseService,
              private _activatedRoute: ActivatedRoute,
              private app: AppComponent) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(id).subscribe(
        data => this.course = data)
       
    }
  }

addCourseToUser(){

  this.user = this.app.getUser()
  this._courseService.addCourseToUser(new CourseToUser(this.user.id, this.course)).subscribe(
    data => {
      console.log("userid: ", this.user.id);
      },)
}  

}
