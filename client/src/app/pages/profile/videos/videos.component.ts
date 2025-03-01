import { Component } from '@angular/core';
import { VideoCardVerticalComponent } from '../../../components/video-card-vertical/video-card-vertical.component';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [VideoCardVerticalComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {}
