import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {VideoModel} from '../../../models/video.model';
import {DecimalPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-video-card-vertical',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, DecimalPipe, MatIconModule ],
  templateUrl: './video-card-vertical.component.html',
  styleUrl: './video-card-vertical.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCardVerticalComponent {
  @Input() video!: VideoModel;
}
