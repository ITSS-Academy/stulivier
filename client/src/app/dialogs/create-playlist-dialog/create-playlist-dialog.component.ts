import {Component, ElementRef, Inject, inject, Input, OnInit, Renderer2} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {CreatePlaylistDto, PlaylistModel} from '../../../models/playlist.model';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import {VideoModel} from '../../../models/video.model';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../../models/user.model';
import {Router} from '@angular/router';
import {UserState} from '../../../ngrxs/user/user.state';
import {PlaylistState} from '../../../ngrxs/playlist/playlist.state';
import {AlertService} from '../../../services/alert.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogRef} from '@angular/cdk/dialog';
import {CreateVideoDialogComponent} from '../create-video-dialog/create-video-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedModule} from '../../../shared/modules/shared.module';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import {MatCheckbox} from '@angular/material/checkbox';
import {VideoService} from '../../../services/video.service';
import {PlaylistService} from '../../../services/playlist.service';

interface Visibility {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-playlist-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    MatButton,
    SharedModule,
    MatInput,
    MatOption,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss'
})
export class CreatePlaylistDialogComponent implements OnInit {
  subscriptions: Subscription[] = [];
  playlistForm!: FormGroup;
  user$: Observable<UserModel>;
  user!: UserModel;
  options = [
    { value: 'true', viewValue: 'Public' },
    { value: 'false', viewValue: 'Private' },
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<{
      user: UserState;
      playlist: PlaylistState;
    }>,
    private alertService: AlertService,
  ) {
    this.user$ = this.store.select('user', 'user');
  }

  ngOnInit() {
    this.playlistForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      visibility: ['', Validators.required],
    });
    this.subscriptions.push(
      this.user$.subscribe((user: UserModel) => {
        if (user.id) {
          this.user = user;
        }
      }),
      this.store
        .select('playlist', 'isCreatePlaylistSuccess')
        .subscribe((isCreatePlaylistSuccess) => {
          if (isCreatePlaylistSuccess) {
            this.alertService.showAlert(
              `Playlist created successfully!`,
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
    this.dialog.closeAll();
  }

  createPlaylist() {
    if (this.playlistForm.invalid) {
      return;
    }

    const createPlaylistModel = {
      title: this.playlistForm.get('title')?.value,
      is_public: this.playlistForm.get('visibility')?.value === 'true',
      user_id: this.user.id,
    };

    this.store.dispatch(
      PlaylistActions.createPlaylist({
        createPlaylistDto: createPlaylistModel,
      }),
    );
  }
}
