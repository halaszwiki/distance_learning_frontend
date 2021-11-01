
import { Course } from "./course";
import { Exam } from "./exam";
import { Grade } from "./grade";

export class User {

    user_id: number;
	roles: string[];
	username: string;
	email: string;
	password: string;
	courses: Course[];
	exams: Exam[];
	grade: Grade[];
}
