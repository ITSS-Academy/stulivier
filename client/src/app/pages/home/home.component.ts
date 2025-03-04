import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  subscription: Subscription[] = [];
  topCategory$: Observable<CategoryDetailModel[]>;

  constructor(
    private store: Store<{ video: VideoState; category: CategoryState }>,
  ) {
    this.topCategory$ = this.store.select('category', 'topCategories');
    this.store.dispatch(CategoryActions.getTopCategories());
  }

  ngOnInit() {
    this.subscription.push(
      this.topCategory$.subscribe(
        (topCategories) => {
          console.log(topCategories);
        },
        (error) => {
          console.log(error);
        },
      ),
    );
  }
}
