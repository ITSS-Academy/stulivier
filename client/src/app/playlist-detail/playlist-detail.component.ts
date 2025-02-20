import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { VideoModule } from '../../shared/modules/video.module';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent {}
