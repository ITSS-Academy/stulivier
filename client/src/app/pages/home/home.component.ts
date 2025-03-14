import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../ngrxs/video/video.state';
import { CategoryState } from '../../../ngrxs/category/category.state';
import { CategoryDetailModel } from '../../../models/category.model';
import * as CategoryActions from '../../../ngrxs/category/category.actions';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { VideoCardVerticalSkeletonComponent } from '../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
    SlicePipe,
    VideoCardVerticalSkeletonComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  topCategory$: Observable<CategoryDetailModel[]>;
  isGettingTopCategories$!: Observable<boolean>;

  currentlyPlayingId: string | null = null; // ID của video đang phát
  hoveringVideoId: string | null = null; // ID của video đang được hover

  constructor(
    private store: Store<{ video: VideoState; category: CategoryState }>,
    private router: Router,
  ) {
    this.topCategory$ = this.store.select('category', 'topCategories');
    this.isGettingTopCategories$ = this.store.select(
      'category',
      'isGettingTopCategories',
    );
    this.store.dispatch(CategoryActions.getTopCategories());
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.currentlyPlayingId = null;
    this.hoveringVideoId = null;
  }

  ngOnInit() {
    this.subscription.push();
  }

  navigateToCategory(id: string) {
    this.router.navigate(['/category'], {
      queryParams: { id: id },
    });
  }

  onVideoHover(videoId: string) {
    this.hoveringVideoId = videoId;

    setTimeout(() => {
      // Chỉ phát nếu chuột vẫn đang ở trên video sau thời gian delay
      if (this.hoveringVideoId === videoId) {
        // Nếu đã có video khác đang phát, dừng nó
        if (this.currentlyPlayingId && this.currentlyPlayingId !== videoId) {
          this.stopCurrentVideo();
        }
        this.currentlyPlayingId = videoId;
      }
    }, 500);
  }

  onVideoLeave(videoId: string) {
    this.hoveringVideoId = null;

    // Nếu video hiện tại là video vừa rời chuột thì dừng nó ngay lập tức
    if (this.currentlyPlayingId === videoId) {
      this.stopCurrentVideo();
    }
  }

  stopCurrentVideo() {
    this.currentlyPlayingId = null;
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearAllPlaylistState());
  }
}
