import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Exam } from 'src/app/models/exam';
import { ExamPayload } from 'src/app/models/examPayload';
import { Grade } from 'src/app/models/grade';
import { User } from 'src/app/models/user';
import { ExamService } from 'src/app/services/exam.service';
import { GradeComponent } from '../../grade/grade.component';

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
  grade: string;
  message: string = "";
  isUsersEmpty: boolean = false;
  noUsers: string = "Nope";

  constructor(private _examService: ExamService,
              private _activatedRoute: ActivatedRoute,
              public app: AppComponent,
              private _dialog: MatDialog,
              private _router: Router
              ) { 
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
      this.getUsersOnExam();
      },)
      
  }
  
  getUsersOnExam() {
    this._examService.getUsersOnExam(this.examId).subscribe(data => {
      this.users = data;
      if(this.users.length == 0){
        this.isUsersEmpty = true;
      }
    }, error => {
      throwError(error);
    });
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.data = {
      exam: this.exam
    }
    this._dialog.open(GradeComponent, dialogConfig)
  }

  removeExam(){
    this.user = this.app.getUser();
    this._examService.removeUserFromExam(new ExamPayload(this.user.id, this.exam)).subscribe(
      data =>{
        this.message = "Successfully removed.";
        this._router.navigateByUrl("/exams");
      }
    );
  }

  isExamRemovable(){
    this.user = this.app.getUser();
    if(this.users.filter(u => u.username == this.user.username).length > 0){
      return true;
    }
    return false;
  }

  canRegister(){
    this.user = this.app.getUser();
    if(this.users.filter(u => u.username == this.user.username).length > 0){
      return false;
    }
    return true;
  }
}
