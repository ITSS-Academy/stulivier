import { Controller, Get, Param, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../../utils/custom_decorators';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @Public()
  @Get()
  async getCategoryById(@Request() req: any) {
    const { id } = req.query;
    return await this.categoriesService.getCategoryById(id);
  }

  @Public()
  @Get('top')
  async getTopCategories() {
    return await this.categoriesService.getTopCategories();
  }
}
