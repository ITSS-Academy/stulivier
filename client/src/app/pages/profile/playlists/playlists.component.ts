import { Component, OnInit } from '@angular/core';
import { PlaylistCardComponent } from '../../../components/playlist-card/playlist-card.component';
import { Observable, Subscription } from 'rxjs';
import { PlaylistModel } from '../../../../models/playlist.model';
import { UserModel } from '../../../../models/user.model';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../../ngrxs/video/video.state';
import { PlaylistState } from '../../../../ngrxs/playlist/playlist.state';
import { UserState } from '../../../../ngrxs/user/user.state';
import { AsyncPipe } from '@angular/common';
import * as PlaylistActions from '../../../../ngrxs/playlist/playlist.actions';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [PlaylistCardComponent, AsyncPipe],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  subscription: Subscription[] = [];
  playlists$: Observable<PlaylistModel[]>;
  user$!: Observable<UserModel>;
  userId$!: Observable<UserModel>; //người dùng khác
  userById!: UserModel;

  constructor(
    private store: Store<{
      video: VideoState;
      playlist: PlaylistState;
      user: UserState;
    }>,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.userId$ = this.store.select('user', 'userById');
  }

  ngOnInit() {
    this.subscription.push(
      this.userId$.subscribe((userId) => {
        if (userId.id) {
          this.userById = userId;
          this.store.dispatch(
            PlaylistActions.getPlaylistByUserId({ id: this.userById.id }),
          );
        }
      }),
    );
  }
}
