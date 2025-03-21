import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { Observable, Subscription } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../ngrxs/video/video.state';
import { UserState } from '../../../ngrxs/user/user.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { UserModel } from '../../../models/user.model';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import { PlaylistDetailModel } from '../../../models/playlist.model';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { VideoCardVerticalSkeletonComponent } from '../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-watch-later',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
    NgxSkeletonLoaderModule,
    VideoCardVerticalSkeletonComponent,
  ],
  templateUrl: './watch-later.component.html',
  styleUrl: './watch-later.component.scss',
})
export class WatchLaterComponent implements OnInit, OnDestroy {
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;
  subscription: Subscription[] = [];
  user$!: Observable<UserModel>;
  user!: UserModel;
  playlistDetail$!: Observable<PlaylistDetailModel>;
  playlistDetail!: PlaylistDetailModel;
  videos$!: Observable<VideoModel[]>;
  isCheckLogin$!: Observable<boolean>;

  isGettingWatchLaterPlaylist$!: Observable<boolean>;

  constructor(
    private store: Store<{
      video: VideoState;
      playlist: PlaylistState;
      user: UserState;
      auth: AuthState;
    }>,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
    this.isGettingWatchLaterPlaylist$ = this.store.select(
      'playlist',
      'isGettingWatchLaterPlaylistByUserId',
    );
    this.isCheckLogin$ = this.store.select('auth', 'isCheckLoggedIn');
  }

  ngOnInit(): void {
    this.subscription.push(
      this.playlistDetail$.subscribe((playlistDetail) => {
        this.playlistDetail = playlistDetail;
      }),
      this.user$.subscribe((user) => {
        if (user?.id) {
          this.user = user;
        }
      }),
      this.store
        .select('user', 'isGetUserSuccess')
        .subscribe((isGetUserSuccess) => {
          if (isGetUserSuccess) {
            this.store.dispatch(
              PlaylistActions.getWatchLaterPlaylistByUserId({
                userId: this.user.id,
              }),
            );
          }
        }),

      this.store
        .select('playlist', 'isDeleteWatchLaterPlaylistSuccess')
        .subscribe((isDeleteWatchLaterPlaylistSuccess) => {
          if (isDeleteWatchLaterPlaylistSuccess) {
            this.alertService.showAlert(
              `Delete video in watch later playlist successfully`,
              'Close',
              3000,
              'end',
              'top',
            );
            this.store.dispatch(
              PlaylistActions.getWatchLaterPlaylistByUserId({
                userId: this.user.id,
              }),
            );
            this.store.dispatch(PlaylistActions.clearPlaylistState());
          }
        }),
    );
  }

  playAll(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/watch'], {
      queryParams: {
        v: this.playlistDetail.videos[0].id,
        list: this.playlistDetail.playlist.id,
        index: 0,
      },
    });
  }

  shuffle(event: Event): void {
    event.stopPropagation();
    const randomIndex = Math.floor(
      Math.random() * this.playlistDetail.videos.length,
    );
    this.router.navigate(['/watch'], {
      queryParams: {
        v: this.playlistDetail.videos[randomIndex].id,
        list: this.playlistDetail.playlist.id,
        index: randomIndex,
      },
    });
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearAllPlaylistState());
  }
}
