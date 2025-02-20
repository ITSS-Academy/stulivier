import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const videoModules = [
  VgCoreModule,
  VgStreamingModule,
  VgControlsModule,
  VgBufferingModule,
  VgOverlayPlayModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, ...videoModules],
  declarations: [],
  exports: [...videoModules],
})
export class VideoModule {}
