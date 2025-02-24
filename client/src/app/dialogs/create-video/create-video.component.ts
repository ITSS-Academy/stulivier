import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, MatIconModule, MatButtonModule, MatDividerModule, MatSlider, MatSliderThumb],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss',
})
export class CreateVideoComponent implements AfterViewInit {
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
