import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { CategoryModel } from '../../../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../ngrxs/category/category.state';
import * as CategoryActions from '../../../ngrxs/category/category.actions';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  categories$!: Observable<CategoryModel[]>;

  constructor(private store: Store<{ category: CategoryState }>) {
    this.categories$ = this.store.select('category', 'categories');
    this.store.dispatch(CategoryActions.getAllCategories());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.categories$.subscribe((categories) => {
        console.log('categories', categories);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
