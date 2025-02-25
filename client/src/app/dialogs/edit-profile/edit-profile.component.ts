import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  @ViewChild('textarea', { static: false }) textarea!: ElementRef<HTMLTextAreaElement>;
  @Input()Progress!: number;

  // value = Progress;

  mode: ProgressBarMode = 'determinate';
  value = 90;
  bufferValue = 75;

  ngAfterViewInit() {
    this.autoResize(); // Gọi ngay khi component render
  }

  autoResize() {
    if (this.textarea) {
      const el = this.textarea.nativeElement;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }
}
