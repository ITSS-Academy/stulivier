import { createAction, props } from '@ngrx/store';
import {CategoryModel} from '../../models/category.model';

export const getAllCategories = createAction('[Category] Get All');

export const getAllCategoriesSuccess = createAction(
  '[Category] Get All Success',
  props<{ categories: CategoryModel[] }>(),
);

export const getAllCategoriesFailure = createAction(
  '[Category] Get All Failure',
  props<{ error: string }>(),
);
