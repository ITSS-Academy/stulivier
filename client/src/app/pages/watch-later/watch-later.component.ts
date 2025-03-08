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
  coverImage: string | ArrayBuffer | null =
    'https://hybsmigdaummopabuqki.supabase.co/storage/v1/object/public/cover_img//nasa_earth_grid.jpg';
  isGettingWatchLaterPlaylist$!: Observable<boolean>;

  constructor(
    private store: Store<{
      video: VideoState;
      playlist: PlaylistState;
      user: UserState;
    }>,
    private router: Router,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
    this.isGettingWatchLaterPlaylist$ = this.store.select(
      'playlist',
      'isGettingWatchLaterPlaylistByUserId',
    );
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
        .select('playlist', 'playlistDetail')
        .subscribe((playlistDetail) => {
          console.log(playlistDetail);
        }),
      this.isGettingWatchLaterPlaylist$.subscribe(
        (isGettingWatchLaterPlaylist) => {
          console.log(isGettingWatchLaterPlaylist);
        },
      ),
    );
  }

  triggerCoverInput(): void {
    this.coverInput.nativeElement.click();
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.coverImage = reader.result);
      reader.readAsDataURL(file);
    }
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

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistState());
  }
}
