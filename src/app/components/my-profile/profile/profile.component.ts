import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { Grade } from 'src/app/models/grade';
import { User } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  courses: Course[] = [];
  exams: Exam[] = [];

  constructor(
    private _userService: UserService, 
    private _courseService: CourseService,
    private _activatedRoute: ActivatedRoute, 
    private app: AppComponent) { }
  
  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.user = this.app.getUser();
    }
    this.getCourses();
    this.getExams();
  }

  getCourses(){
    this._courseService.getTimetable(this.app.getUser().id).subscribe(
      data => this.courses = data
    )
  }

  getExams(){
    this._userService.getExams(this.app.getUser().id).subscribe(
      data => this.exams = data
    )
  }

}

