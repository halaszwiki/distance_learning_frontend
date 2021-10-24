import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CoursePayload } from 'src/app/models/coursePayload';
import { User } from 'src/app/models/user';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: User[] = [];
  course: Course = new Course();
  searchBox: string;
  key: string = "name"
  courseId: number;

  constructor(
    private _userService: UserService,
    private _courseService: CourseService,
    private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
      this.courseId = +this._activatedRoute.snapshot.paramMap.get('id');
      this._courseService.getCourse(this.courseId).subscribe(
        data =>{
          this.course = data;
        })
    }
        this.listUsers(); 
  }

  sort(key: string){
    this.key = key;
  }

  listUsers(){
    this._userService.getAllUser().subscribe(
      data => this.users = data
    )
  }

  addUserToCourse(id: number){
    this.courseId = id;
    this._courseService.addCourseToUser(new CoursePayload(id, this.course)).subscribe(
      data => {
        console.log("Hozzaadva: ", id, + "ehhez: " + this.courseId);
        },)

  }


}