import { CategoryModel } from '../../models/category.model';

export interface CategoryState {
  categories: CategoryModel[];
  isGettingAllCategories: boolean;
  isGetAllCategoriesSuccess: boolean;
  getAllCategoriesErrorMessages: string;
}
