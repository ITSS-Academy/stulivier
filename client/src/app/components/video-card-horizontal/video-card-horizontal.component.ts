import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {DecimalPipe} from '@angular/common';
import {PlaylistModel} from '../../../models/playlist.model';

@Component({
  selector: 'app-video-card-horizontal',
  templateUrl: './video-card-horizontal.component.html',
  styleUrl: './video-card-horizontal.component.scss',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    DecimalPipe,
  ]
})
export class VideoCardHorizontalComponent {
  @Input() video!: PlaylistModel;
}
