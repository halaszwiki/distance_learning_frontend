import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
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
  dropdownSettings = {};

  constructor(private _courseService: CourseService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(id).subscribe(
        data => this.course = data)
       
    }
    console.log(this.course.name);
    this.dropdownSettings = {
      textField: 'days',
    };
  }

  saveCourse() {
      this._courseService.saveCourse(this.course).subscribe(
        data => {
          console.log('response', data);
            this._router.navigateByUrl("/courses");
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