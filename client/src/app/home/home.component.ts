import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { VideoModule } from '../../shared/modules/video.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
