import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { DialogRef } from '@angular/cdk/dialog';
import {FormGroup} from '@angular/forms';
import {UserModel} from '../../../models/user.model'; // Dùng DialogRef thay vì MatDialogRef

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
  editProfile = new FormGroup({});
  current: UserModel = {
    id: 'string',
    username: 'Nguyen Van A',
    email: 'string',
    avatar_url: 'string',
    joined_date: 'Gemini hiện được trang bị sức mạnh của 2.0 Flash, \n mô hình mới nhất của chúng tôi cho kỷ nguyên trợ lý AI.\n Mô hình này có tốc độ phản hồi nhanh hơn và hiệu suất vượt trội theo một số thang đo quan trọng đánh giá khả năng trợ giúp các nhiệm vụ hằng ngày, như lên ý tưởng, học tập hay viết lách.\n ',
  } //data mẫu để test

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

  @ViewChild('dropZone', { static: false }) dropZone!: ElementRef;
  previewImage: string | null = null;

  onFileSelectedAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.previewImage = URL.createObjectURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dropZone.nativeElement.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    this.dropZone.nativeElement.classList.remove('drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dropZone.nativeElement.classList.remove('drag-over');
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.previewImage = URL.createObjectURL(file);
    }
  }
}
