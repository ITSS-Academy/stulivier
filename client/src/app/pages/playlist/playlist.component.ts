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

  constructor(
    private store: Store<{ playlist: PlaylistState; user: UserState }>,
  ) {
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.isGetPlaylistByUserIdSuccess$ = this.store.select(
      'playlist',
      'isGetPlaylistByUserIdSuccess',
    );
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
  }

  ngOnInit() {
    this.store.select('user', 'user').subscribe((user: UserModel) => {
      if (user.id) {
        this.user = user;
      }
    });
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
      });
    this.playlists$.subscribe((playlist: PlaylistModel[]) => {
      this.playlists = playlist;
    });

    this.isGetPlaylistByUserIdSuccess$.subscribe(
      (isGetPlaylistByUserIdSuccess) => {
        if (isGetPlaylistByUserIdSuccess) {
          this.store.dispatch(
            PlaylistActions.getPlaylistById({ id: this.playlists[0].id }),
          );
        }
      },
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistState());
  }
}
