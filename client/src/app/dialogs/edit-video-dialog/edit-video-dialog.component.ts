import {Component, Inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SharedModule} from '../../../shared/modules/shared.module';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {CategoryModel} from '../../../models/category.model';
import {DialogRef} from '@angular/cdk/dialog';
import {Store} from '@ngrx/store';
import {CategoryState} from '../../../ngrxs/category/category.state';
import {VideoState} from '../../../ngrxs/video/video.state';
import {VideoService} from '../../../services/video.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import * as CategoryActions from '../../../ngrxs/category/category.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import {VideoModel} from '../../../models/video.model';
import {UserModel} from '../../../models/user.model';
import {UserState} from '../../../ngrxs/user/user.state';
import {MatStepperPrevious} from '@angular/material/stepper';

@Component({
  selector: 'app-edit-video-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    SharedModule,
    CdkFixedSizeVirtualScroll,
    CdkTextareaAutosize,
    CdkVirtualScrollViewport,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
  ],
  templateUrl: './edit-video-dialog.component.html',
  styleUrl: './edit-video-dialog.component.scss'
})
export class EditVideoDialogComponent implements OnInit {
  editForm!: FormGroup;
  subscription: Subscription[] = [];
  categories$!: Observable<CategoryModel[]>;
  video!: VideoModel;
  user$!: Observable<UserModel>; //test only


  constructor(
    private dialogRef: DialogRef<EditVideoDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<{
      category: CategoryState;
      video: VideoState,
      user: UserState
    }>,
    private videoService: VideoService,
    private dialog: MatDialog, // Inject MatDialog
    @Inject(MAT_DIALOG_DATA) public data: { video: VideoModel },
  ) {
    this.categories$ = this.store.select('category', 'categories');
    this.store.dispatch(CategoryActions.getAllCategories());
    this.video = data.video;
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [this.video.title || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.video.description || '', [Validators.maxLength(5000)]],
      categories: [this.video.category_id || '', Validators.required],
    });
    console.log('Editing video ID:', this.video);
    this.subscription.push(
      this.store.select('video', 'videos').subscribe((videos) => {
        console.log(videos);
      }),
    );
    this.subscription.push(
      this.store.select('video', 'isUpdateVideoSuccess').subscribe((isUpdateVideoSuccess) => {
        if (isUpdateVideoSuccess) {
          this.closeDialog();
          this.store.dispatch(VideoActions.clearState())
          this.store.dispatch(VideoActions.getVideosByUserId({ userId: this.video.user_id }));
        }
      })
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }


  onEditClick() {
    if (this.editForm.invalid) {
      return;
    }

    const updatedVideo: Partial<VideoModel> = {
      id: this.video.id,
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      category_id: this.editForm.value.categories
    };

    this.store.dispatch(VideoActions.updateVideo({ video: updatedVideo }));
  }


}

