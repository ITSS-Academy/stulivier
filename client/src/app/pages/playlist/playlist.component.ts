import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoCardHorizontalComponent } from '../../components/video-card-horizontal/video-card-horizontal.component';
import { PlaylistCardInPagePlaylistComponent } from '../../components/playlist-card-in-page-playlist/playlist-card-in-page-playlist.component';
import { Store } from '@ngrx/store';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { Observable, Subscription } from 'rxjs';
import {
  PlaylistDetailModel,
  PlaylistModel,
} from '../../../models/playlist.model';
import { UserState } from '../../../ngrxs/user/user.state';
import { UserModel } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { VideoModel } from '../../../models/video.model';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { AuthState } from '../../../ngrxs/auth/auth.state';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistDialogComponent } from '../../dialogs/edit-playlist-dialog/edit-playlist-dialog.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardHorizontalComponent,
    PlaylistCardInPagePlaylistComponent,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit, OnDestroy {
  playlists$!: Observable<PlaylistModel[]>;
  playlistDetail$!: Observable<PlaylistDetailModel>;
  playlists: PlaylistModel[] = [];
  user!: UserModel;
  user$: Observable<UserModel>;
  subscriptions: Subscription[] = [];
  isGetPlaylistByUserIdSuccess$!: Observable<boolean>;
  isRemoveVideoInPlaylistSuccess$!: Observable<boolean>;
  isCheckLogin$!: Observable<boolean>;
  index = 0;
  readonly dialog = inject(MatDialog);

  constructor(
    private store: Store<{
      playlist: PlaylistState;
      user: UserState;
      auth: AuthState;
    }>,
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.isGetPlaylistByUserIdSuccess$ = this.store.select(
      'playlist',
      'isGetPlaylistByUserIdSuccess',
    );
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
    this.isRemoveVideoInPlaylistSuccess$ = this.store.select(
      'playlist',
      'isRemoveVideoInPlaylistSuccess',
    );
    this.isCheckLogin$ = this.store.select('auth', 'isCheckLoggedIn');
    this.user$ = this.store.select('user', 'user');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.queryParamMap.subscribe((queryParams) => {
        const index = queryParams.get('index');
        console.log('index', index);
      }),
      this.store.select('user', 'user').subscribe((user: UserModel) => {
        if (user.id) {
          this.user = user;
        }
      }),
      this.store
        .select('user', 'isGetUserSuccess')
        .subscribe((isGetUserSuccess) => {
          if (isGetUserSuccess) {
            this.store.dispatch(
              PlaylistActions.getPlaylistByUserId({
                id: this.user.id,
              }),
            );
          }
        }),
      this.playlists$.subscribe((playlist: PlaylistModel[]) => {
        this.playlists = playlist;
      }),

      this.isGetPlaylistByUserIdSuccess$.subscribe(
        (isGetPlaylistByUserIdSuccess) => {
          if (isGetPlaylistByUserIdSuccess) {
            this.store.dispatch(
              PlaylistActions.getPlaylistById({ id: this.playlists[0].id }),
            );
          }
        },
      ),

      this.store
        .select('playlist', 'isDeletePlaylistByIdSuccess')
        .subscribe((isDeletePlaylistSuccess) => {
          if (isDeletePlaylistSuccess) {
            this.alertService.showAlert(
              `Playlist deleted successfully`,
              'Close',
              3000,
              'end',
              'top',
            );
            this.store.dispatch(PlaylistActions.clearPlaylistState());
            this.store.dispatch(
              PlaylistActions.getPlaylistByUserId({ id: this.user.id }),
            );
          }
        }),
      this.store
        .select('playlist', 'isUpsertPlaylistByIdSuccess')
        .subscribe((isUpdatePlaylistSuccess) => {
          if (isUpdatePlaylistSuccess) {
            this.alertService.showAlert(
              `Playlist updated successfully`,
              'Close',
              3000,
              'end',
              'top',
            );
            this.store.dispatch(PlaylistActions.clearPlaylistState());
            this.store.dispatch(
              PlaylistActions.getPlaylistByUserId({ id: this.user.id }),
            );
          }
        }),
      this.isRemoveVideoInPlaylistSuccess$.subscribe(
        (isRemoveVideoInPlaylistSuccess) => {
          if (isRemoveVideoInPlaylistSuccess) {
            this.alertService.showAlert(
              `Video removed from playlist successfully`,
              'Close',
              3000,
              'end',
              'top',
            );
            this.store.dispatch(PlaylistActions.clearPlaylistState());
            this.store.dispatch(
              PlaylistActions.getPlaylistByUserId({ id: this.user.id }),
            );
          }
        },
      ),
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      const indexFromUrl = Number(params['index']);
      if (!isNaN(indexFromUrl)) {
        this.index = indexFromUrl;

        // Giả lập click vào playlist tương ứng
        const playlist = this.playlists[indexFromUrl];
        if (playlist) {
          this.onClickPlaylist(playlist.id, indexFromUrl);
        }
      }
    });
  }

  onClickPlaylist(playlistId: string, index: number) {
    this.store.dispatch(PlaylistActions.getPlaylistById({ id: playlistId }));
    // Cập nhật index trên URL
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { index },
      queryParamsHandling: 'merge', // Giữ các query params khác nếu có
    });
    this.index = index;
  }

  onPlayAll(playlistId: string) {
    const videoId = this.playlists.find(
      (playlist) => playlist.id === playlistId,
    )?.video_id[0];
    this.router.navigate(['watch'], {
      queryParams: {
        v: videoId,
        list: playlistId,
        index: 0,
      },
    });
  }

  onPlayShuffle(playlistId: string) {
    const playlist = this.playlists.find(
      (playlist) => playlist.id === playlistId,
    );
    if (playlist && playlist.video_id && playlist.video_id.length > 0) {
      const randomIndex = Math.floor(Math.random() * playlist.video_id.length);
      const videoId = playlist.video_id[randomIndex];
      this.router.navigate(['watch'], {
        queryParams: {
          v: videoId,
          list: playlistId,
          index: randomIndex,
        },
      });
    }
  }

  removeVideoInPlaylist(video: VideoModel) {
    this.store.dispatch(
      PlaylistActions.removeVideoInPlaylist({
        playlistId: this.playlists[this.index].id,
        videoId: video.id,
      }),
    );
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearAllPlaylistState());
  }
}
