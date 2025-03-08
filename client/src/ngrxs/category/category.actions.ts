import { createAction, props } from '@ngrx/store';
import {
  CategoryDetailModel,
  CategoryModel,
} from '../../models/category.model';

export const getAllCategories = createAction('[Category] Get All');

export const getAllCategoriesSuccess = createAction(
  '[Category] Get All Success',
  props<{ categories: CategoryModel[] }>(),
);

export const getAllCategoriesFailure = createAction(
  '[Category] Get All Failure',
  props<{ error: string }>(),
);

export const getCategoryById = createAction(
  '[Category] Get By Id',
  props<{ id: string }>(),
);

export const getCategoryByIdSuccess = createAction(
  '[Category] Get By Id Success',
  props<{ category: CategoryModel }>(),
);

export const getCategoryByIdFailure = createAction(
  '[Category] Get By Id Failure',
  props<{ error: string }>(),
);

export const getTopCategories = createAction('[Category] Get Top');

export const getTopCategoriesSuccess = createAction(
  '[Category] Get Top Success',
  props<{ topCategories: CategoryDetailModel[] }>(),
);

export const getTopCategoriesFailure = createAction(
  '[Category] Get Top Failure',
  props<{ error: string }>(),
);

export const clearCategoryState = createAction('[Category] Clear State');
