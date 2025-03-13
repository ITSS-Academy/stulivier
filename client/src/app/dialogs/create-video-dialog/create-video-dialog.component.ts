import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CategoryModel } from '../../../models/category.model';
import { CreateVideoDto } from '../../../models/video.model';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperIcon,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../ngrxs/category/category.state';
import { VideoState } from '../../../ngrxs/video/video.state';
import { VideoService } from '../../../services/video.service';
import { AlertService } from '../../../services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import * as CategoryActions from '../../../ngrxs/category/category.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-create-video-dialog',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    MatStepperIcon,
  ],
  templateUrl: './create-video-dialog.component.html',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  styleUrl: './create-video-dialog.component.scss',
})
export class CreateVideoDialogComponent implements OnInit, OnDestroy {
  uploadForm!: FormGroup;
  videoFile!: File;
  thumbnailFile!: File;
  subscription: Subscription[] = [];
  isFormDisabled = false;
  categories$: Observable<CategoryModel[]>;
  videoDto!: CreateVideoDto;
  uploadProgress$: Observable<number | null>;
  isCreateVideoSuccess$: Observable<boolean>;
  isCreateVideoSuccess = false;
  isFileUploaded = false;
  isThumbnailUploaded = false;
  selectedCategories: string[] = [];
  @ViewChild('stepper') stepper!: MatStepper;

  @Input() Progress!: number;

  constructor(
    private dialogRef: DialogRef<CreateVideoDialogComponent>,
    private fb: FormBuilder,
    private store: Store<{ category: CategoryState; video: VideoState }>,
    private videoService: VideoService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {
    this.categories$ = this.store.select('category', 'categories');
    this.isCreateVideoSuccess$ = this.store.select(
      'video',
      'isCreateVideoSuccess',
    );
    this.store.dispatch(CategoryActions.getAllCategories());
    this.uploadProgress$ = this.videoService.getUploadProgress();
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      fileName: ['', Validators.required],
      description: ['', Validators.required],
      categories: [[], Validators.required],
      thumbnail: ['', Validators.required],
      visibility: [''],
    });

    this.subscription.push(
      this.isCreateVideoSuccess$.subscribe((isSuccess) => {
        if (isSuccess) {
          this.store.dispatch(VideoActions.clearState());

          this.store.dispatch(VideoActions.getAllVideos());
          this.isCreateVideoSuccess = true;
          this.alertService.showAlert(
            `Video uploaded successfully!`,
            'Close',
            3000,
            'end',
            'top',
          );
          this.closeDialog();
        }
      }),
    );
  }

  closeDialog() {
    if (this.isCreateVideoSuccess) {
      this.dialogRef.close();
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: {
          message:
            'If you close, the video upload will be cancelled. Are you sure you want to close?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }
  }

  onUploadButtonClick() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    this.isFileUploaded = true;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Gọi hàm upload file
      this.uploadFile(file);
      // Ép Angular cập nhật UI
      this.cd.detectChanges();

      this.stepper.next();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadFile(file);
      this.uploadForm.patchValue({ fileName: file.name });
    }
  }

  uploadFile(file: File) {
    if (file.type === 'video/mp4') {
      this.videoFile = file;

      // Handle the file upload
    } else {
      console.error('Invalid file type. Please upload an MP4 file.');
    }
  }

  onThumbnailSelected(event: Event) {
    this.isThumbnailUploaded = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadForm.patchValue({ thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
      this.thumbnailFile = file;
    }
  }

  onEditThumbnailClick() {
    const fileInput = document.getElementsByClassName(
      'edit-thumbnail-file-input',
    )[0] as HTMLInputElement;
    fileInput.click();
  }

  onThumbnailInputClick() {
    console.log('onThumbnailInputClick');
    const fileInput = document.getElementsByClassName(
      'thumbnail-file-input',
    )[0] as HTMLInputElement;
    fileInput.click();
  }

  onUploadClick() {
    if (this.uploadForm.valid && this.videoFile) {
      this.disableForm();
      const formValues = this.uploadForm.value;

      this.videoDto = {
        title: formValues.fileName,
        description: formValues.description,
        category_id: formValues.categories,
        playlist_id: [],
      };

      this.store.dispatch(
        VideoActions.createVideo({
          createVideoDto: this.videoDto,
          videoFile: this.videoFile,
          imageFile: this.thumbnailFile,
        }),
      );
    }
  }

  disableForm() {
    this.uploadForm.disable();
    this.isFormDisabled = true;
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  onCategorySelectionChange(event: MatSelectChange) {
    const selectedOptions = event.source.selected as MatOption[];
    if (selectedOptions.length > 3) {
      event.source.writeValue(this.selectedCategories); // Revert to previous selection
    } else {
      this.selectedCategories = selectedOptions.map((option) => option.value);
    }
  }

  isCategoryDisabled(categoryId: string): boolean {
    return (
      this.selectedCategories.length >= 3 &&
      !this.selectedCategories.includes(categoryId)
    );
  }

  goToStep3() {}
}
