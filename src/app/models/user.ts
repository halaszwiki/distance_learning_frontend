import { Course } from "./course";
import { Exam } from "./exam";

export class User {

    id: number;
	roles: string[];
	username: string;
	email: string;
	password: string;
	courses: Course[];
	exams: Exam[];
}
