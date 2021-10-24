import { Exam } from "./exam";

export class ExamPayload {
userId: number;
exam: Exam;

constructor(userId: number, exam: Exam){
    this.userId = userId;
    this.exam = exam;
    }
}