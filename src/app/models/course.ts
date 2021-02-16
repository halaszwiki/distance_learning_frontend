import { User } from './user';

export class Course {
    id: number;
    name: string;
    semester: number;
    degreeLevel: string;
    usersInCourse: User[];
}
