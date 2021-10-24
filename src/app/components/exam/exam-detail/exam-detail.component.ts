import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Exam } from 'src/app/models/exam';
import { ExamPayload } from 'src/app/models/examPayload';
import { User } from 'src/app/models/user';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {

  exam: Exam = new Exam();
  examId: number;
  user: User = new User();
  users: User[] = [];

  constructor(private _examService: ExamService,
              private _activatedRoute: ActivatedRoute,
              private app: AppComponent) { 

            }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.examId = +this._activatedRoute.snapshot.paramMap.get('id');
      this._examService.getExam(this.examId).subscribe(
        data =>{
          this.exam = data;
        })
    }
    this.getUsersOnExam();
  }

registerUserToExam(){
  this.user = this.app.getUser();
  this._examService.addExamToUser(new ExamPayload(this.user.id, this.exam)).subscribe(
    data => {
      console.log("userid: ", this.user.id);
      },)
  }
  
  private getUsersOnExam() {
    this._examService.getUsersOnExam(this.examId).subscribe(data => {
      this.users = data;
    }, error => {
      throwError(error);
    });
  }
}
