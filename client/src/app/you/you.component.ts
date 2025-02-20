import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { VideoModule } from '../../shared/modules/video.module';

@Component({
  selector: 'app-you',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './you.component.html',
  styleUrl: './you.component.scss',
})
export class YouComponent {}
