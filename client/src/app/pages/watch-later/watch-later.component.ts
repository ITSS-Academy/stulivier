import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {VideoCardHorizontalComponent} from '../../components/video-card-horizontal/video-card-horizontal.component';
import {VideoCardVerticalComponent} from "../../components/video-card-vertical/video-card-vertical.component";
import {Observable} from 'rxjs';
import {VideoModel} from '../../../models/video.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../ngrxs/video/video.state';
import {UserState} from '../../../ngrxs/user/user.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import {UserModel} from '../../../models/user.model';
import {user} from '@angular/fire/auth';
import {PlaylistState} from '../../../ngrxs/playlist/playlist.state';
import {PlaylistDetailModel} from '../../../models/playlist.model';

@Component({
  selector: 'app-watch-later',
  standalone: true,
    imports: [
        SharedModule,
        MaterialModule,
        VideoModule,
        VideoCardHorizontalComponent,
        VideoCardVerticalComponent,
    ],
  templateUrl: './watch-later.component.html',
  styleUrl: './watch-later.component.scss',
})
export class WatchLaterComponent implements OnInit {
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;
  user$!: Observable<UserModel>; //test only
  PlaylistDetail$!: Observable<PlaylistDetailModel[] | null>; //test only
  coverImage: string | ArrayBuffer | null =
    'https://hybsmigdaummopabuqki.supabase.co/storage/v1/object/public/cover_img//nasa_earth_grid.jpg';

  constructor(private store: Store<{ video: VideoState; playlist: PlaylistState; user: UserState }>) {
    this.user$ = this.store.select('user', 'user');

    // Lắng nghe user$ và dispatch action để lấy danh sách playlist của user
    this.user$.subscribe((user) => {
      if (user?.id) {
        this.store.dispatch(PlaylistActions.getPlaylistByUserId({ id: user.id }));
      }
    });
  }

  ngOnInit(): void {}

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
    // Add your play all logic here
  }

  shuffle(event: Event): void {
    event.stopPropagation();
    // Add your shuffle logic here
  }

}
