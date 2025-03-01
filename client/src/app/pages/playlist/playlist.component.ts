import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { PlaylistModel } from '../../../models/playlist.model';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {}
