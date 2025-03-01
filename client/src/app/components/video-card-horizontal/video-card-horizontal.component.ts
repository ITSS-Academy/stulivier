import { Component, Input } from '@angular/core';
import { VideoModel } from '../../../models/video.model';
import { PlaylistModel } from '../../../models/playlist.model';

@Component({
  selector: 'app-video-card-horizontal',
  templateUrl: './video-card-horizontal.component.html',
  styleUrl: './video-card-horizontal.component.scss',
  standalone: true,
})
export class VideoCardHorizontalComponent {
  @Input() video!: PlaylistModel;
}
