import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { CreateVideoDto } from '../models/video.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

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
    console.log(videoId);
    console.log(userId);
    return this.http.get('videos/', { params: { videoId, userId } });
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
}
