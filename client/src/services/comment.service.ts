import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { CreateCommentDto } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClientAuth) {}

  createComment(comment: CreateCommentDto) {
    return this.http.post('comments', comment);
  }

  getCommentsByVideoId(videoId: string) {
    return this.http.get('comments', { params: { videoId } });
  }
}
