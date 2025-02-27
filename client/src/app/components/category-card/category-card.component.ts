import {Component, Input} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {CategoryModel} from '../../../models/category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input()category!:CategoryModel;
}
