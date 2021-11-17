import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Course } from 'src/app/models/course';
import { User } from 'src/app/models/user';
import { CoursePayload } from 'src/app/models/coursePayload';

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
  users: User[] = [];
  areThereUsers = false;
  comments: CommentPayload[] = [];
  comment: CommentPayload = new CommentPayload();
  commentForm: FormGroup;
  message: string = "";

  constructor(private _courseService: CourseService,
              private _commentService: CommentService,
              private _activatedRoute: ActivatedRoute,
              public app: AppComponent) { 

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
    this.getUsersOnCourse();
  }

addCourseToUser(){
  this.user = this.app.getUser()
  this._courseService.addCourseToUser(new CoursePayload(this.user.id, this.course)).subscribe(
    data => {
      this.message = "Successfully added.";
      this.getUsersOnCourse();
      },)
}  

private getUsersOnCourse() {
  this._courseService.getUsersOnCourse(this.courseId).subscribe(data => {
    this.users = data;
    if(this.users.length != null){
      this.areThereUsers = true;
    }
  }, error => {
    throwError(error);
  });
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

removeCourse(){
  this.user = this.app.getUser();
  this._courseService.removeUserFromCourse(new CoursePayload(this.user.id, this.course)).subscribe(
    data =>{
      window.location.reload();
      this.message = "Successfully removed.";
    }
  );
}


isRemovable(){
  this.user = this.app.getUser();
  if(this.users.filter(u => u.username == this.user.username).length > 0){
    return true;
  }
  return false;
}

canAdd(){
  this.user = this.app.getUser();
  if(this.users.filter(u => u.username == this.user.username).length > 0){
    return false;
  }
  return true;
}


}
