import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  userid: number;

  constructor(
    private _courseService: CourseService,
    public app: AppComponent,
    private _activatedRoute: ActivatedRoute
    ) { }
    

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.userid = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    this.listCourses(this.userid);
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
    this.listCourses(this.userid);
      }
    )
  }

  listCourses(id: number){
    this._courseService.getMyCourses(id).subscribe(
      data => this.courses = data
    )
  }

}
