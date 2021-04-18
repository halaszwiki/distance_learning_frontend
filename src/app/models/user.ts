import { Course } from "./course";

export class User {

    id: number;
	roles: string[];
	username: string;
	email: string;
	password: string;
	courses: Course[];
}
