import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
