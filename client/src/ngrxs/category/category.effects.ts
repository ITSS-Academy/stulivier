import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as CategoryActions from './category.actions';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

//All
export const getAllCategories$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const categoryService = inject(CategoryService);
    return actions$.pipe(
      ofType(CategoryActions.getAllCategories),
      exhaustMap(() => {
        return categoryService.getAllCategories().pipe(
          map((response) =>
            CategoryActions.getAllCategoriesSuccess({
              categories: response as CategoryModel[],
            }),
          ),
          catchError((obj) => {
            return of(
              CategoryActions.getAllCategoriesFailure({
                error: obj.error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
