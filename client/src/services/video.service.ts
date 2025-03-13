import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { CreateVideoDto, UpdateVideoModel } from '../models/video.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(
    private http: HttpClientAuth,
    private socket: Socket,
  ) {}

  create(createVideoDto: CreateVideoDto, videoFile: File, imageFile: File) {
    const formData = new FormData();
    formData.append('files', videoFile); // Cả video và image đều vào 'files'
    formData.append('files', imageFile);
    formData.append('createVideoDto', JSON.stringify(createVideoDto));

    return this.http.post('videos', formData);
  }

  getUploadProgress(): Observable<number> {
    return this.socket.fromEvent<number>('uploadProgress');
  }

  getAllVideos() {
    return this.http.get('videos/all');
  }

  getVideoById(videoId: string, userId: string | null) {
    return this.http.get('videos', { params: { videoId, userId } });
  }

  getVideosByUserId(userId: string) {
    return this.http.get('videos/user', { params: { userId } });
  }

  getVideosByCategoryId(categoryId: string) {
    return this.http.get('videos/category', { params: { categoryId } });
  }

  increaseViewCount(videoId: string) {
    return this.http.post('videos/view', { videoId });
  }

  updateWatchTime(videoId: string, userId: string, watchTime: number) {
    return this.http.post('videos/watch-time', { videoId, userId, watchTime });
  }

  toggleReaction(videoId: string, userId: string) {
    return this.http.post('videos/reaction', { videoId, userId });
  }

  searchVideos(search_query: string) {
    return this.http.get('videos/search', { params: { search_query } });
  }

  getVideoLikedByUserId(userId: string) {
    return this.http.get('videos/liked', { params: { userId } });
  }

  updateVideo(video: UpdateVideoModel) {
    return this.http.put(`videos`, video);
  }

  addToWatchHistory(videoId: string, userId: string) {
    return this.http.post('videos/watch-history', { videoId, userId });
  }

  deleteVideo(videoId: string) {
    return this.http.delete(`videos`, { params: { videoId } });
  }
}
