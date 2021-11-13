import { User } from "./user";

export class Exam {
    id: number;
    name: string;
    semester: number;
    degreeLevel: string;
    program: string;
    date: Date;
    start: Number;
    end: Number;
    usersInExam: User[];
    courseId: number;
    courseName: String;
    creatorId: number;
}