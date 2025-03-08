import {Component, Input} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {PlaylistModel} from '../../../models/playlist.model';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: PlaylistModel;
}
