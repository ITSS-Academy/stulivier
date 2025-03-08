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
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { VideoModel } from '../../../models/video.model';

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
  subscriptions: Subscription[] = [];
  isGetPlaylistByUserIdSuccess$!: Observable<boolean>;
  isRemoveVideoInPlaylistSuccess$!: Observable<boolean>;
  index = 0;

  constructor(
    private store: Store<{ playlist: PlaylistState; user: UserState }>,
    private router: Router,
    private alertService: AlertService,
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
  }

  ngOnInit() {
    this.subscriptions.push(
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
  }

  onClickPlaylist(playlistId: string, index: number) {
    this.store.dispatch(PlaylistActions.getPlaylistById({ id: playlistId }));
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistState());
  }
}
