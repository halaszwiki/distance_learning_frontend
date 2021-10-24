import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Exam } from 'src/app/models/exam';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {

  exam: Exam = new Exam();
  searchBox: string;
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  start: Number[] = [8, 10, 12, 14, 16];
  end: Number[] = [10, 12, 14, 16, 18];
  dropdownSettings = {};
  startSelected: Number;
  endSelected: Number;
  errorMessage = '';

  constructor(
    private _examService: ExamService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public app: AppComponent
  ) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      const id = +this._activatedRoute.snapshot.paramMap.get('id');
      this._examService.getExam(id).subscribe(
        data => {
          this.exam = data;
          this.startSelected = this.exam.start;
          this.endSelected = this.exam.end;
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
