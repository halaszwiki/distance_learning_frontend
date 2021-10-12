import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";

@Injectable({
    providedIn: 'root'
  })
  export class CommentService {

    private getUrl: string = "/api/comment";

    constructor(private _httpClient: HttpClient) { }

    getCommentsFromCourse(id: number): Observable<Comment>{
        return this._httpClient.get<Comment>(`${this.getUrl}/${id}`).pipe(
          map(response => response)
        )
      }
    
    addComment(comment: Comment): Observable<Comment>{
        return this._httpClient.post<Comment>(`${this.getUrl}/id`, comment);
    }

  }  