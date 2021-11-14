import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  userid: number;
  courses: Course[] = [];
  monday: Course[] = [];
  tuesday: Course[] = [];
  wednesday: Course[] = [];
  thursday: Course[] = [];
  friday: Course[] = [];



  constructor(private _courseService: CourseService,
    public app: AppComponent,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.userid = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    this.listCourses(this.userid);
  }

  listCourses(id: number){
    this._courseService.getTimetable(id).subscribe(
      data => { this.courses = data,
      console.log(this.courses)
      for(let course of this.courses){
        for(let day of course.days){
          if(day.includes("Monday")){
            this.monday.push(course);
          }
          if(day.includes("Tuesday")){
            console.log("Tuesday")
            this.tuesday.push(course);
          }
          if(day.includes("Wednesday")){
            this.wednesday.push(course);
          } 
          if(day.includes("Thursday")){
            this.thursday.push(course);
          }
          if(day.includes("Friday")){
            this.friday.push(course);
          } 
        }
      }
      this.sortCoursesByStart();
    })

  }

  sortCoursesByStart(){
    this.monday.sort((a, b) => (a.start > b.start) ? 1 : -1 )
    this.tuesday.sort((a, b) => (a.start > b.start) ? 1 : -1 )
    this.wednesday.sort((a, b) => (a.start > b.start) ? 1 : -1 )
    this.thursday.sort((a, b) => (a.start > b.start) ? 1 : -1 )
    this.friday.sort((a, b) => (a.start > b.start) ? 1 : -1 )
  }

}
