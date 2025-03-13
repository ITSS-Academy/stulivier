import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { Observable, Subscription } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../ngrxs/category/category.state';
import * as CategoryActions from '../../../ngrxs/category/category.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import { ActivatedRoute } from '@angular/router';
import { VideoState } from '../../../ngrxs/video/video.state';
import { VideoModel } from '../../../models/video.model';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos$!: Observable<VideoModel[]>;
  category$!: Observable<CategoryModel>;

  constructor(
    private store: Store<{ category: CategoryState; video: VideoState }>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.videos$ = this.store.select((state) => state.video.videos);
    this.category$ = this.store.select((state) => state.category.category);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.queryParamMap.subscribe((params) => {
        const categoryId = params.get('id');
        this.store.dispatch(
          CategoryActions.getCategoryById({ id: categoryId as string }),
        );
        this.store.dispatch(
          VideoActions.getVideoByCategoryId({
            categoryId: categoryId as string,
          }),
        );
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
