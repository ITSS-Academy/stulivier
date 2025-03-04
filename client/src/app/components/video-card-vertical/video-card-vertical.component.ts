import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../../dialogs/playlist-dialog/playlist-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card-vertical',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, DecimalPipe],
  templateUrl: './video-card-vertical.component.html',
  styleUrl: './video-card-vertical.component.scss',
})
export class VideoCardVerticalComponent implements AfterViewInit {
  @Input() video!: VideoModel;
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    if (this.router.url.includes('/watch?')) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.video-card'),
        'width',
        '330px',
      );
    }
  }

  onVideoClick(event: Event): void {
    event.preventDefault();
    this.router
      .navigate(['/watch'], {
        queryParams: { v: this.video.id },
      })
      .then((r) => r);
  }

  openDialog(event: MouseEvent) {
    event.stopPropagation();
  }

  openPlaylistDialog() {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      minWidth: 600,
      minHeight: 400,
      data: this.video.id,
    });
  }
}
