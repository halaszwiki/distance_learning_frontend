import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";
import { CommentPayload } from "../models/commentPayload";

@Injectable({
    providedIn: 'root'
  })
  export class CommentService {

    private getUrl: string = "/api/comment";

    constructor(private _httpClient: HttpClient) { }

    getCommentsFromCourse(id: number): Observable<CommentPayload[]>{
        return this._httpClient.get<CommentPayload[]>(`${this.getUrl}/${id}`);
      }
    
    addComment(comment: CommentPayload): Observable<CommentPayload>{
        return this._httpClient.post<CommentPayload>(`${this.getUrl}/addComment`, comment);
    }

  }  