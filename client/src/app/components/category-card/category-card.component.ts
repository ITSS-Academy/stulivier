import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { CategoryModel } from '../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() category!: CategoryModel;

  constructor(private router: Router) {}

  navigateToCategory() {
    this.router.navigate(['/category'], {
      queryParams: { id: this.category.id },
    });
  }
}
