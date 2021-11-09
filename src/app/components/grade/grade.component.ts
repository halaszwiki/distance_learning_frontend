import { Component, Inject, OnInit } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Exam } from 'src/app/models/exam';
import { Grade } from 'src/app/models/grade';
import { User } from 'src/app/models/user';
import { ExamService } from 'src/app/services/exam.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  username: string;
  students: User[] = [];
  grade: number;

  constructor(
    private _examService: ExamService,
    @Inject(MAT_DIALOG_DATA) public data: {exam: Exam}
  ) { }

  ngOnInit(): void {
    this.getGradeableStudents();
  }

  getGradeableStudents() {
    this._examService.getGradeableStudents(this.data.exam.id).subscribe(data => {
      this.students = data;
    }, error => {
      throwError(error);
    });
  }

  addGrade(){
    this._examService.addGrade(new Grade(this.username, this.data.exam.courseId, this.grade)).subscribe(
      data => {
        console.log("username: ", this.username);
        console.log("courseid: ", this.data.exam.courseId);
        console.log("grade: ", this.grade)
        },)
  }
}
