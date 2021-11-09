import { User } from "./user";


export class Grade {
username: string;
grade: number;
courseId: number;

constructor(username: string, courseId: number, grade: number){
    this.username = username;
    this.courseId = courseId;
    this.grade = grade;
    }
}