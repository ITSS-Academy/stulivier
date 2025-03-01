import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DialogRef } from '@angular/cdk/dialog';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperIcon,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CreateVideoDto } from '../../../models/video.model';
import { CategoryModel } from '../../../models/category.model';
import { CategoryState } from '../../../ngrxs/category/category.state';
import { VideoState } from '../../../ngrxs/video/video.state';
import { Store } from '@ngrx/store';
import * as CategoryActions from '../../../ngrxs/category/category.actions';
import { VideoService } from '../../../services/video.service';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import { AlertService } from '../../../services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    MatStep,
    MatStepper,
    MatStepperPrevious,
    MatStepLabel,
    MatStepperNext,
    MatStepperIcon,
  ],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss',
})
export class CreateVideoComponent implements OnInit, OnDestroy {
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
  @ViewChild('stepper') stepper!: MatStepper;

  @Input() Progress!: number;

  constructor(
    private dialogRef: DialogRef<CreateVideoComponent>,
    private formBuilder: FormBuilder,
    private store: Store<{ category: CategoryState; video: VideoState }>,
    private videoService: VideoService,
    private alertService: AlertService,
    private dialog: MatDialog, // Inject MatDialog
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
    this.uploadForm = this.formBuilder.group({
      fileName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(5000)]],
      categories: ['', Validators.required],
      visibility: ['', Validators.required],
      thumbnail: ['', Validators.required],
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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file);
      this.uploadForm.patchValue({ fileName: file.name });
      this.isFileUploaded = true;

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
    console.log(event);
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
}
