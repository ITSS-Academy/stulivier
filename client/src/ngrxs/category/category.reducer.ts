import { createReducer, on } from '@ngrx/store';
import { CategoryState } from './category.state';
import * as CategoryActions from './category.actions';
import { CategoryModel } from '../../models/category.model';

const initialState: CategoryState = {
  categories: [],
  category: <CategoryModel>{},
  topCategories: [],

  isGettingAllCategories: false,
  isGetAllCategoriesSuccess: false,
  getAllCategoriesErrorMessages: '',

  isGettingCategoryById: false,
  isGetCategoryByIdSuccess: false,
  getCategoryByIdErrorMessage: '',

  isGettingTopCategories: false,
  isGetTopCategoriesSuccess: false,
  getTopCategoriesErrorMessages: '',
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

  // By Id
  on(CategoryActions.getCategoryById, (state) => ({
    ...state,
    isGettingCategoryById: true,
    isGetCategoryByIdSuccess: false,
  })),
  on(CategoryActions.getCategoryByIdSuccess, (state, action) => ({
    ...state,
    isGettingCategoryById: false,
    isGetCategoryByIdSuccess: true,
    category: action.category,
  })),

  on(CategoryActions.getCategoryByIdFailure, (state, action) => ({
    ...state,
    isGettingCategoryById: false,
    getCategoryByIdErrorMessage: action.error,
  })),

  // Top
  on(CategoryActions.getTopCategories, (state, { type }) => ({
    ...state,
    isGettingTopCategories: true,
    isGetTopCategoriesSuccess: false,
  })),
  on(CategoryActions.getTopCategoriesSuccess, (state, action) => ({
    ...state,
    isGettingTopCategories: false,
    isGetTopCategoriesSuccess: true,
    topCategories: action.topCategories,
  })),
  on(CategoryActions.getTopCategoriesFailure, (state, action) => ({
    ...state,
    isGettingTopCategories: false,
    getTopCategoriesErrorMessages: action.error,
  })),

  on(CategoryActions.clearCategoryState, (state) => ({
    ...state,

    isGettingAllCategories: false,
    isGetAllCategoriesSuccess: false,
    getAllCategoriesErrorMessages: '',

    isGettingCategoryById: false,
    isGetCategoryByIdSuccess: false,
    getCategoryByIdErrorMessage: '',

    isGettingTopCategories: false,
    isGetTopCategoriesSuccess: false,
    getTopCategoriesErrorMessages: '',
  })),
);
