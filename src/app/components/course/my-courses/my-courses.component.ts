import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  courses: Course[] = [];
  searchBox: string;
  key: string = "semester";

  constructor(
    private _courseService: CourseService,
    public app: AppComponent) { }

  ngOnInit(): void {
    this.listCourses();
  }

  sort(key: string){
    this.key = key;
  }

  delete(i: any){
    this.courses.splice(i);
  }

  deleteCourse(id: number){
    this._courseService.deleteCourse(id).subscribe(
      data => { console.log('deleted response', data);
    this.listCourses();
      }
    )
  }

  listCourses(){
    this._courseService.getMyCourses(this.app.getUser().user_id).subscribe(
      data => this.courses = data
    )
  }

}
