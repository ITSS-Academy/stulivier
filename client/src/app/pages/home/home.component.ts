import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { VideoModel } from '../../../models/video.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../ngrxs/video/video.state';
import * as VideoActions from '../../../ngrxs/video/video.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
