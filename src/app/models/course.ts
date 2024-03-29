import { CommentPayload } from './commentPayload';
import { User } from './user';

export class Course {
    id: number;
    name: string;
    semester: number;
    degreeLevel: string;
    program: string;
    days: string[];
    start: Number;
    end: Number;
    usersInCourse: User[];
    comments: CommentPayload[];
    creatorId: Number;
}
