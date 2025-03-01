import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss',
})
export class CreateVideoComponent implements AfterViewInit {
  @ViewChild('textarea', { static: false })
  textarea!: ElementRef<HTMLTextAreaElement>;
  @Input() Progress!: number;

  // value = Progress;

  mode: ProgressBarMode = 'determinate';
  value = 90;
  bufferValue = 75;
  createVideo = new FormGroup({});
  readonly VideoName = new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
  ]);
  readonly Describe = new FormControl('', [Validators.maxLength(1000)]);
  errorVideoNameMessage = signal('');
  errorDescribeMessage = signal('');

  constructor(private dialogRef: DialogRef<CreateVideoComponent>) {
    merge(this.Describe.statusChanges, this.Describe.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateDescribeErrorMessage());

    merge(this.VideoName.statusChanges, this.VideoName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateVideoNameErrorMessage());
  }

  ngAfterViewInit() {
    // this.autoResize(); // Gọi ngay khi component render
  }

  autoResize() {
    if (this.textarea) {
      const el = this.textarea.nativeElement;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }

  updateVideoNameErrorMessage() {
    if (this.VideoName.hasError('required')) {
      this.errorVideoNameMessage.set('You must enter a value');
    } else {
      this.errorVideoNameMessage.set('');
    }
  }

  updateDescribeErrorMessage() {
    if (this.Describe.hasError('required')) {
      this.errorDescribeMessage.set('You must enter a value');
    } else {
      this.errorDescribeMessage.set('');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Handle the selected file
      console.log(file);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
