import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
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
  degreeLevels: string[] = ['Bsc', 'MSc'];
  program: string[] = ['Electrical Engineering', 'Computer Engineering'];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  start: string;
  end: string;
  selectedLevel: string = '';

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
  }

  saveCourse() {
    this._courseService.saveCourse(this.course).subscribe(
    data => {
      console.log('response', data);
        this._router.navigateByUrl("/courses");
      }
    )
  }

  radioChanged(event: any){
  this.selectedLevel = event.target.value;
  }
}
