import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';

@Component({
  selector: 'app-liked-videos',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss',
})
export class LikedVideosComponent {}
