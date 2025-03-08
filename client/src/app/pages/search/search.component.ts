import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../ngrxs/video/video.state';
import { Observable } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { VideoCardHorizontalComponent } from '../../components/video-card-horizontal/video-card-horizontal.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardHorizontalComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  videos$!: Observable<VideoModel[]>;
  isSearchVideosSuccess$!: Observable<boolean>;

  constructor(
    private store: Store<{ video: VideoState }>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.videos$ = this.store.select('video', 'videos');
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const query = params.get('search_query');
      this.store.dispatch(
        VideoActions.searchVideos({ searchQuery: query as string }),
      );
    });
    this.isSearchVideosSuccess$ = this.store.select(
      'video',
      'isSearchVideosSuccess',
    );
  }
}
