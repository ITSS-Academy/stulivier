import { Component, inject, Input } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../../dialogs/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-video-card-vertical',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, DecimalPipe],
  templateUrl: './video-card-vertical.component.html',
  styleUrl: './video-card-vertical.component.scss',
})
export class VideoCardVerticalComponent {
  @Input() video!: VideoModel;
  readonly dialog = inject(MatDialog);

  openPlaylistDialog() {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      minWidth: 600,
      minHeight: 400,
      data: this.video.id,
    });
  }
}
