import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DialogRef } from '@angular/cdk/dialog'; // Dùng DialogRef thay vì MatDialogRef

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  @ViewChild('textarea', { static: false })
  textarea!: ElementRef<HTMLTextAreaElement>;
  @Input() Progress!: number;
  value = 90;

  constructor(private dialogRef: DialogRef<EditProfileComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Handle the selected file
      console.log(file);
    }
  }
}
