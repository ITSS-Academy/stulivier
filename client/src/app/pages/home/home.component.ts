import { Component, OnDestroy, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.subscription.push(
      this.isGettingTopCategories$.subscribe(
        (isGettingTopCategories: boolean) => {
          console.log(isGettingTopCategories);
        },
      ),
    );
  }

  navigateToCategory(id: string) {
    this.router.navigate(['/category'], {
      queryParams: { id: id },
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearPlaylistState());
  }
}
