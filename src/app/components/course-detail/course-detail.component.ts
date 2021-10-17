import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CourseToUser } from 'src/app/models/courseToUser';

import { CourseService } from 'src/app/services/course.service';
import { CommentService } from 'src/app/services/comment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/models/commentPayload';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course = new Course();
  courseId: number;
  user: User = new User();
  comments: CommentPayload[] = [];
  comment: CommentPayload = new CommentPayload();
  commentForm: FormGroup;

  constructor(private _courseService: CourseService,
              private _commentService: CommentService,
              private _activatedRoute: ActivatedRoute,
              private app: AppComponent) { 

              this.commentForm = new FormGroup({
                text: new FormControl('', Validators.required)
              });

            }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.courseId = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(this.courseId).subscribe(
        data =>{
          this.course = data;
        })
    }
    this.getCommentsForCourse();
  }

addCourseToUser(){
  this.user = this.app.getUser()
  this._courseService.addCourseToUser(new CourseToUser(this.user.id, this.course)).subscribe(
    data => {
      console.log("userid: ", this.user.id);
      },)
}  

private getCommentsForCourse() {
  this._commentService.getCommentsFromCourse(this.courseId).subscribe(data => {
    this.comments = data;
  }, error => {
    throwError(error);
  });
}

postComment() {
  this.comment.comment = this.commentForm.get('text').value;
  this.comment.username = this.app.getUser().username;
  this.comment.courseId = this.courseId;

  this._commentService.addComment(this.comment).subscribe(data => {
    this.commentForm.get('text').setValue('');
    this.getCommentsForCourse();
  }, error => {
    throwError(error);
  })
}


}
