import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { Exam } from 'src/app/models/exam';
import { CourseService } from 'src/app/services/course.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  course: Course = new Course();
  exam: Exam = new Exam();
  errorMessage = '';
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  start: Number[] = [8, 10, 12, 14, 16];
  end: Number[] = [10, 12, 14, 16, 18];
  dropdownSettings = {};
  startSelected: Number;
  endSelected: Number;

  constructor(private _examService: ExamService, 
    private app: AppComponent,
    private _courseService: CourseService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(id).subscribe(
        data => {
          this.course = data;
          this.exam.courseId = this.course.id;
          this.exam.degreeLevel = this.course.degreeLevel;
          this.exam.name = this.course.name + " exam";
          this.exam.program = this.course.program;
          this.exam.semester = this.course.semester;
          this.exam.creatorId = this.app.getUser().user_id;
        });
    }

    this.dropdownSettings = {
      textField: 'days',
    };
  }

  saveExam() {
    this.exam.start = this.startSelected;
    this.exam.end = this.endSelected;
    this._examService.saveExam(this.exam).subscribe(
      data => {
        console.log('response', data);
          this._router.navigateByUrl("/exams");
        },
        err => {
          console.error(err.error);
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      )
}

onDaySelected(day){
  const index: number = this.exam.days.indexOf(day);
  if (index == -1) {
      this.exam.days.push(day);
  }  
}

onDayDeselected(day){
  const index: number = this.exam.days.indexOf(day);
  if (index !== -1) {
      this.exam.days.splice(index, 1);
  }   
}

}
