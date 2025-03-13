import { Component, OnInit } from '@angular/core';
import { VideoCardVerticalComponent } from '../../../components/video-card-vertical/video-card-vertical.component';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { VideoModel } from '../../../../models/video.model';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../../ngrxs/video/video.state';
import * as VideoActions from '../../../../ngrxs/video/video.actions';
import { UserModel } from '../../../../models/user.model';
import { UserState } from '../../../../ngrxs/user/user.state';
import { filter, take } from 'rxjs/operators';
import * as PlaylistActions from '../../../../ngrxs/playlist/playlist.actions';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [VideoCardVerticalComponent, AsyncPipe],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent implements OnInit {
  subscription: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  userId$!: Observable<UserModel>; //người dùng khác
  userById!: UserModel;

  constructor(
    private store: Store<{
      video: VideoState;
      user: UserState; //test only
    }>,
  ) {
    this.videos$ = this.store.select('video', 'videos');
    this.userId$ = this.store.select('user', 'userById');
  }

  ngOnInit() {
    this.subscription.push(
      this.userId$.subscribe((userId) => {
        if (userId.id) {
          this.userById = userId;
          this.store.dispatch(
            VideoActions.getVideosByUserId({ userId: this.userById.id }),
          );
        }
      }),
    );
  }
}
