import {Component, OnInit} from '@angular/core';
import { VideoCardVerticalComponent } from '../../../components/video-card-vertical/video-card-vertical.component';
import {AsyncPipe} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrxs/video/video.state';
import * as VideoActions from '../../../../ngrxs/video/video.actions';


@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [VideoCardVerticalComponent, AsyncPipe],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent implements OnInit{
subscription: Subscription[] = [];
videos$: Observable<VideoModel[]>;

constructor(private store: Store<{ video: VideoState }>) {
  this.videos$ = this.store.select('video', 'videos');
  this.store.dispatch(VideoActions.getAllVideos());
}

ngOnInit() {
  this.subscription.push(
    this.store.select('video', 'videos').subscribe((videos) => {
      console.log(videos);
    }),
  );
}
}
