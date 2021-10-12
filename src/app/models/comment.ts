export class Comment {
    id: number;
    username: string;
    comment: string;

    constructor(id: number, username: string, comment: string){
        this.id = id;
        this.username = username;
        this.comment = comment;
    }
}