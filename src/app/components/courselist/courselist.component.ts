import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {


  courses: Course[] = [];
  searchBox: string;
  key: string = "semester";
  reverse: boolean = false;

  constructor(private _courseService: CourseService,
    private _router: Router, public app: AppComponent) { }

  ngOnInit(): void {
this.listCourses();
  }

  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
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
    this._courseService.getAllCourse().subscribe(
      data => this.courses = data
    )
  }

}
