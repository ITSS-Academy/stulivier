import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { VideoModule } from '../../shared/modules/video.module';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss',
})
export class WatchComponent {}
