import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course: Course = new Course();
  searchBox: string;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  start: Number[] = [8, 10, 12, 14, 16];
  end: Number[] = [10, 12, 14, 16, 18];
  dropdownSettings = {};
  startSelected: Number;
  endSelected: Number;
  errorMessage = '';
  isIdPresent: boolean;

  constructor(private _courseService: CourseService,
    private _router: Router,
    private app: AppComponent,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(this.isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(id).subscribe(
        data => {
          this.course = data;
          this.startSelected = this.course.start;
          this.endSelected = this.course.end;   
        });
    }

    this.dropdownSettings = {
      textField: 'days',
    };
  }

  saveCourse() {
      this.course.start = this.startSelected;
      this.course.end = this.endSelected;
      this.course.creatorId = this.app.getUser().id;
      console.log(this.course.creatorId);
      this._courseService.saveCourse(this.course).subscribe(
        data => {
          console.log('response', data);
            this._router.navigateByUrl("/courses");
          },
          err => {
            console.error(err.error);
            this.errorMessage = err.error.message;
            console.log(this.errorMessage);
          }
        )
  }

  onDaySelected(day){
    const index: number = this.course.days.indexOf(day);
    if (index == -1) {
        this.course.days.push(day);
    }  
  }

  onDayDeselected(day){
    const index: number = this.course.days.indexOf(day);
    if (index !== -1) {
        this.course.days.splice(index, 1);
    }   
}

}