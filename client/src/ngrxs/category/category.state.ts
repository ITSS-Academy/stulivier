import {
  CategoryDetailModel,
  CategoryModel,
} from '../../models/category.model';

export interface CategoryState {
  categories: CategoryModel[];
  category: CategoryModel;
  topCategories: CategoryDetailModel[];

  isGettingAllCategories: boolean;
  isGetAllCategoriesSuccess: boolean;
  getAllCategoriesErrorMessages: string;

  isGettingCategoryById: boolean;
  isGetCategoryByIdSuccess: boolean;
  getCategoryByIdErrorMessage: string;

  isGettingTopCategories: boolean;
  isGetTopCategoriesSuccess: boolean;
  getTopCategoriesErrorMessages: string;
}
