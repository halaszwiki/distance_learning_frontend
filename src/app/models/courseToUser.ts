import { Course } from "./course";
import { User } from "./user";


export class CourseToUser {
userId: number;
course: Course;

constructor(userId: number, course: Course){
    this.userId = userId;
    this.course = course;
}
}