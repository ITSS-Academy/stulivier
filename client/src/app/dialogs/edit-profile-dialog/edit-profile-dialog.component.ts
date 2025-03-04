import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import {DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    MatButton,
    MatFabButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
})
export class EditProfileDialogComponent {
  @ViewChild('textarea', {static: false})
  textarea!: ElementRef<HTMLTextAreaElement>;
  @Input() Progress!: number;
  value = 90;
  editProfile = new FormGroup({});
  current: UserModel = {
    id: 'string',
    username: 'Nguyen Van A',
    email: 'string',
    avatar_url: 'string',
    joined_date:
      'Gemini hiện được trang bị sức mạnh của 2.0 Flash, \n mô hình mới nhất của chúng tôi cho kỷ nguyên trợ lý AI.\n Mô hình này có tốc độ phản hồi nhanh hơn và hiệu suất vượt trội theo một số thang đo quan trọng đánh giá khả năng trợ giúp các nhiệm vụ hằng ngày, như lên ý tưởng, học tập hay viết lách.\n ',
  }; //data mẫu để test
  @ViewChild('dropZone', {static: false}) dropZone!: ElementRef;
  @ViewChild('dropZoneAvatar', {static: false}) dropZoneAvatar!: ElementRef;
  previewBackground: string | null = null;

  constructor(private dialogRef: DialogRef<EditProfileDialogComponent>) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     // Handle the selected file
  //     console.log(file);
  //   }
  // }

  onFileSelectedBackGround(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.previewBackground = URL.createObjectURL(file);
    }
  }

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


  onDragOver(event: DragEvent, type: 'background' | 'avatar') {
    event.preventDefault();
    if (type === 'background') {
      this.dropZone.nativeElement.classList.add('drag-over');
    } else {
      this.dropZoneAvatar.nativeElement.classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent, type: 'background' | 'avatar') {
    if (type === 'background') {
      this.dropZone.nativeElement.classList.remove('drag-over');
    } else {
      this.dropZoneAvatar.nativeElement.classList.remove('drag-over');
    }
  }

  onDrop(event: DragEvent, type: 'background' | 'avatar') {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (type === 'background') {
        this.dropZone.nativeElement.classList.remove('drag-over');
        this.previewBackground = URL.createObjectURL(file);
      } else {
        this.dropZoneAvatar.nativeElement.classList.remove('drag-over');
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewAvatar = e.target?.result ?? null;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  previewAvatar: string | ArrayBuffer | null | undefined = null;

  onFileSelectedAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatar = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }
}
