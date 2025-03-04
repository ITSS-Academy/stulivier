import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as CategoryActions from './category.actions';
import {
  CategoryDetailModel,
  CategoryModel,
} from '../../models/category.model';
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

//By Id
export const getCategoryById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const categoryService = inject(CategoryService);
    return actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap((action) => {
        return categoryService.getCategoryById(action.id).pipe(
          map((response) =>
            CategoryActions.getCategoryByIdSuccess({
              category: response as CategoryModel,
            }),
          ),
          catchError((obj) => {
            return of(
              CategoryActions.getCategoryByIdFailure({
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

//Top
export const getTopCategories$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const categoryService = inject(CategoryService);
    return actions$.pipe(
      ofType(CategoryActions.getTopCategories),
      exhaustMap(() => {
        return categoryService.getTopCategories().pipe(
          map((response) =>
            CategoryActions.getTopCategoriesSuccess({
              topCategories: response as CategoryDetailModel[],
            }),
          ),
          catchError((obj) => {
            return of(
              CategoryActions.getTopCategoriesFailure({
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
