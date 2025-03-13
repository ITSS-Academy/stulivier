import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistModel } from '../../../models/playlist.model';
import { SharedModule } from '../../../shared/modules/shared.module';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';

@Component({
  selector: 'app-edit-playlist-dialog',
  standalone: true,
  imports: [MatIcon, MaterialModule, SharedModule],
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrl: './edit-playlist-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditPlaylistDialogComponent {
  playlistForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      playlist: PlaylistModel;
    },
    private store: Store<{ playlist: PlaylistState }>,
  ) {
    this.playlistForm = this.fb.group({
      title: [
        this.data.playlist.title,
        [Validators.required, Validators.maxLength(100)],
      ],
      visibility: [this.data.playlist.is_public, [Validators.required]],
    });
  }

  // Method to close the dialog
  closeDialog() {
    this.dialog.closeAll();
  }

  // Method to save edited playlist
  saveEditPlaylist() {
    if (this.playlistForm.valid) {
      this.store.dispatch(
        PlaylistActions.upsertPlaylistById({
          playlistId: this.data.playlist.id,
          updatePlaylistDto: {
            title: this.playlistForm.value.title,
            is_public: this.playlistForm.value.visibility,
          },
        }),
      );
      this.closeDialog();
    }
  }
}
