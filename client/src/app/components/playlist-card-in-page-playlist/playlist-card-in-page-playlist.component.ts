import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PlaylistModel } from '../../../models/playlist.model';
import { NgClass } from '@angular/common';

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

  constructor() {}

  onPlayAll() {
    this.playAll.emit(this.playlist.id);
  }

  onPlayShuffle() {
    this.playShuffle.emit(this.playlist.id);
  }
}
