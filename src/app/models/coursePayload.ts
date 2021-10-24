import { Course } from "./course";

export class CoursePayload {
userId: number;
course: Course;

constructor(userId: number, course: Course){
    this.userId = userId;
    this.course = course;
    }
}