import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PlaylistModel } from '../../../models/playlist.model';
import { NgClass } from '@angular/common';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';

@Component({
  selector: 'app-playlist-card-in-page-playlist',
  standalone: true,
  imports: [
    MatButton,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgClass,
  ],
  templateUrl: './playlist-card-in-page-playlist.component.html',
  styleUrl: './playlist-card-in-page-playlist.component.scss',
})
export class PlaylistCardInPagePlaylistComponent {
  @Input() playlist!: PlaylistModel;
  @Input() highlight = false;

  @Output() playAll = new EventEmitter<string>();
  @Output() playShuffle = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private store: Store<{ playlist: PlaylistState }>,
  ) {}

  onPlayAll() {
    this.playAll.emit(this.playlist.id);
  }

  onPlayShuffle() {
    this.playShuffle.emit(this.playlist.id);
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this playlist?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          PlaylistActions.deletePlaylistById({ playlistId: this.playlist.id }),
        );
        // Perform deletion logic here
      } else {
        console.log('User cancelled deletion');
      }
    });
  }
}
