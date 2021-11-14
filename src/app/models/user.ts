
import { Course } from "./course";
import { Exam } from "./exam";
import { Grade } from "./grade";

export class User {

    id: number;
	roles: string[];
	username: string;
	email: string;
	password: string;
	courses: Course[];
	exams: Exam[];
	grades: Grade[];
}
