import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';

@Component({
  selector: 'app-video-card-vertical',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './video-card-vertical.component.html',
  styleUrl: './video-card-vertical.component.scss',
})
export class VideoCardVerticalComponent {
  @Input() video!: VideoModel;
}
