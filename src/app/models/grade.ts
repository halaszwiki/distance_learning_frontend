import { User } from "./user";


export class Grade {
user: User;
grade: number;
courseId: number;

constructor(user: User, courseId: number, grade: number){
    this.user = user;
    this.courseId = courseId;
    this.grade = grade;
    }
}