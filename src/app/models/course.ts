import { User } from './user';

export class Course {
    id: number;
    name: string;
    semester: number;
    degreeLevel: string;
    program: string;
    days: string[];
    start: string;
    end: string;
    usersInCourse: User[];
}
