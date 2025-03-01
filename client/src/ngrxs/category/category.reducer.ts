import { createReducer, on } from '@ngrx/store';
import { CategoryState } from './category.state';
import * as CategoryActions from './category.actions';

const initialState: CategoryState = {
  categories: [],
  isGettingAllCategories: false,
  isGetAllCategoriesSuccess: false,
  getAllCategoriesErrorMessages: '',
};

export const categoryReducer = createReducer(
  initialState,
  // All
  on(CategoryActions.getAllCategories, (state) => ({
    ...state,
    isGettingAllCategories: true,
  })),
  on(CategoryActions.getAllCategoriesSuccess, (state, action) => ({
    ...state,
    isGettingAllCategories: false,
    isGetAllCategoriesSuccess: true,
    categories: action.categories,
  })),
  on(CategoryActions.getAllCategoriesFailure, (state, action) => ({
    ...state,
    isGettingAllCategories: false,
    getAllCategoriesErrorMessages: action.error,
  })),
);
