import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { PlaylistCardComponent } from '../../../components/playlist-card/playlist-card.component';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {PlaylistModel} from '../../../../models/playlist.model';
import {UserModel} from '../../../../models/user.model';
import * as PlaylistActions from '../../../../ngrxs/playlist/playlist.actions';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrxs/video/video.state';
import {PlaylistState} from '../../../../ngrxs/playlist/playlist.state';
import {UserState} from '../../../../ngrxs/user/user.state';
import {filter, take} from 'rxjs/operators';
import * as VideoActions from '../../../../ngrxs/video/video.actions';
import {AsyncPipe} from '@angular/common';

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

  constructor(private store: Store<{ video: VideoState, playlist: PlaylistState, user: UserState }>,
              private renderer: Renderer2, private el: ElementRef) {
    this.user$ = this.store.select('user', 'user');
    this.user$.pipe(
      filter(user => !!user?.id), // Chỉ lấy khi user có id
      take(1)
    ).subscribe(user => {
      this.store.dispatch(VideoActions.getAllVideos());
    });
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.user$.pipe(
      filter(user => !!user?.id), // Chỉ lấy khi user có id
      take(1)
    ).subscribe(user => {
      this.store.dispatch(PlaylistActions.getPlaylistByUserId({id: user.id}));
    });


  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('playlist', 'playlists').subscribe((playlists) => {
        console.log(playlists);
      }),
    );
  }
}
