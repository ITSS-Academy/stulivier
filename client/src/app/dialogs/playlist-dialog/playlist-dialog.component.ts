import {
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';
import { Store } from '@ngrx/store';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import { UserState } from '../../../ngrxs/user/user.state';
import { Observable, Subscription } from 'rxjs';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { UserModel } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import { PlaylistModel } from '../../../models/playlist.model';

@Component({
  selector: 'app-playlist-dialog',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss',
})
export class PlaylistDialogComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user$: Observable<UserModel>;
  user!: UserModel;
  playlists$!: Observable<PlaylistModel[]>;
  playlist!: PlaylistModel[];
  playlistForm: FormGroup;
  isGetPlaylistByUserIdSuccess$!: Observable<boolean>;

  readonly checked = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
  readonly dialog = inject(MatDialog);

  constructor(
    private dialogRef: MatDialogRef<PlaylistDialogComponent>,
    private store: Store<{
      user: UserState;
      playlist: PlaylistState;
    }>,
    @Inject(MAT_DIALOG_DATA) public data: { videoId: string },
    private fb: FormBuilder,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef, // Add this line
  ) {
    this.user$ = this.store.select('user', 'user');
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.playlistForm = this.fb.group({
      playlists: this.fb.array([]),
    });
    this.isGetPlaylistByUserIdSuccess$ = this.store.select(
      'playlist',
      'isGetPlaylistByUserIdSuccess',
    );
  }

  get playlistsFormArray() {
    return this.playlistForm.get('playlists') as FormArray;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.user$.subscribe((user: UserModel) => {
        if (user.id) {
          this.user = user;
        }
      }),
      this.store
        .select('user', 'isGetUserSuccess')
        .subscribe((isGetUserSuccess) => {
          if (isGetUserSuccess) {
            this.store.dispatch(
              PlaylistActions.getPlaylistByUserId({
                id: this.user.id,
              }),
            );
          }
        }),
      this.playlists$.subscribe((playlist: PlaylistModel[]) => {
        this.playlist = playlist;
      }),
      this.store
        .select('playlist', 'isGetPlaylistByUserIdSuccess')
        .subscribe((isGetPlaylistByUserIdSuccess) => {
          if (isGetPlaylistByUserIdSuccess) {
            this.updatePlaylistsFormArray();
          }
        }),
    );
  }

  updatePlaylistsFormArray() {
    const playlistFormArray = this.playlistForm.get('playlists') as FormArray;
    playlistFormArray.clear();
    this.playlist.forEach((playlist: PlaylistModel) => {
      const isVideoIncluded =
        playlist.video_id?.includes(this.data as any) || false;
      playlistFormArray.push(this.fb.control(isVideoIncluded));
    });
    console.log('playlistFormArray', playlistFormArray.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createPlaylist() {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      minWidth: 400,
      minHeight: 430,
    });
  }

  updatePlaylist(playlist: PlaylistModel, index: number) {
    console.log('updatePlaylist', this.playlistsFormArray.at(index).value);

    if (this.playlistsFormArray.at(index).value) {
      this.alertService.showAlert(
        `Added to ${playlist.title}`,
        'Close',
        3000,
        'end',
        'top',
      );
    } else {
      this.alertService.showAlert(
        `Removed from ${playlist.title}`,
        'Close',
        3000,
        'end',
        'top',
      );
    }
    if (playlist.title == 'Watch later') {
      this.store.dispatch(
        PlaylistActions.updateWatchLaterPlaylist({
          userId: this.user.id,
          videoId: this.data as any,
        }),
      );
    } else {
      this.store.dispatch(
        PlaylistActions.updatePlaylist({
          playlistId: playlist.id,
          videoId: this.data as any,
        }),
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
