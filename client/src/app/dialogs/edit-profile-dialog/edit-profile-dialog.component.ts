import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserModel } from '../../../models/user.model';
import { DialogRef } from '@angular/cdk/dialog';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { AsyncPipe } from '@angular/common';
import * as UserActions from '../../../ngrxs/user/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.scss',
})
export class EditProfileDialogComponent implements OnInit, OnDestroy {
  @ViewChild('textarea', { static: false })
  subscriptions: Subscription[] = [];

  textarea!: ElementRef<HTMLTextAreaElement>;
  editProfileForm!: FormGroup;
  user$!: Observable<UserModel>;
  user!: UserModel;
  previewBackground!: string;
  previewAvatar!: string;
  backgroundFile: File | null = null;
  avatarFile: File | null = null;

  constructor(
    private dialogRef: DialogRef<EditProfileDialogComponent>,
    private store: Store<{ user: UserState }>,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.user$ = this.store.select('user', 'user');
  }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      describe: new FormControl('', Validators.required),
    });

    this.subscriptions.push(
      this.user$.subscribe((user) => {
        if (user) {
          this.user = user;
          this.editProfileForm.patchValue({ describe: user.describe });
          this.previewBackground = user.background_url || '';
          this.previewAvatar = user.avatar_url;
        }
      }),
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onFileSelectedBackGround(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.previewBackground = URL.createObjectURL(file);
      this.backgroundFile = file;
    }
  }

  autoResize() {
    if (this.textarea) {
      const el = this.textarea.nativeElement;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }

  onFileSelectedAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatar = e.target?.result as string;
        this.avatarFile = file;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.editProfileForm.invalid) {
      return;
    }
    if (this.avatarFile !== null) {
      this.store.dispatch(
        UserActions.updateAvatar({
          avatar: this.avatarFile,
          userId: this.user.id,
        }),
      );
    }
    if (this.backgroundFile !== null) {
      this.store.dispatch(
        UserActions.updateChannelImage({
          channelImg: this.backgroundFile,
          userId: this.user.id,
        }),
      );
    }
    this.store.dispatch(
      UserActions.updateDescribe({
        userId: this.user.id,
        describe: this.editProfileForm.value.describe,
      }),
    );
    this.dialogRef.close();
  }

  onCancel() {
    if (
      this.avatarFile ||
      this.backgroundFile ||
      this.editProfileForm.value.describe !== this.user.describe
    ) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'You have unsaved changes. Are you sure you want to leave?',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
