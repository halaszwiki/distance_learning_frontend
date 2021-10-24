import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Exam } from 'src/app/models/exam';
import { CourseService } from 'src/app/services/course.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-examlist',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamlistComponent implements OnInit {

  exams: Exam[] = [];
  searchBox: string;
  key: string = "semester";

  constructor(private _examService: ExamService,
    private _router: Router, 
    private _courseService : CourseService,
    public app: AppComponent) { }

  ngOnInit(): void {
    this.listExams();
  }

  sort(key: string){
    this.key = key;
  }

  delete(i: any){
    this.exams.splice(i);
  }

  deleteCourse(id: number){
  this._examService.deleteExam(id).subscribe(
    data => { console.log('deleted response', data);
      this.listExams();
      }
    )
  }

  listExams(){
    this._examService.getAllExam().subscribe(
      data => this.exams = data
    )
  }
}
