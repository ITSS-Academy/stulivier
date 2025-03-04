import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

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
    MatMenuTrigger
  ],
  templateUrl: './playlist-card-in-page-playlist.component.html',
  styleUrl: './playlist-card-in-page-playlist.component.scss'
})
export class PlaylistCardInPagePlaylistComponent {

}
