import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';

@Component({
  selector: 'app-video-card-horizontal',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './video-card-horizontal.component.html',
  styleUrl: './video-card-horizontal.component.scss',
})
export class VideoCardHorizontalComponent {}
