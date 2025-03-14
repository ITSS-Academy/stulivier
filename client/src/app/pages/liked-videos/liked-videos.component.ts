import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { Observable, Subscription } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { UserModel } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { VideoState } from '../../../ngrxs/video/video.state';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { VideoCardVerticalSkeletonComponent } from '../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-liked-videos',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
    VideoCardVerticalSkeletonComponent,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss',
})
export class LikedVideosComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  user!: UserModel | null;
  user$!: Observable<UserModel>;
  isCheckLogin$!: Observable<boolean>;

  constructor(
    private store: Store<{
      video: VideoState;
      user: UserState;
      auth: AuthState;
    }>,
  ) {
    this.videos$ = this.store.select((state) => state.video.videos);
    this.user$ = this.store.select((state) => state.user.user);
    this.isCheckLogin$ = this.store.select(
      (state) => state.auth.isCheckLoggedIn,
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.user.user)
        .subscribe((user) => {
          this.user = user;
          if (user.id) {
            this.store.dispatch(
              VideoActions.getVideosLikedByUser({ userId: user.id }),
            );
          }
        }),
    );
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  ngOnDestroy(): void {}
}
