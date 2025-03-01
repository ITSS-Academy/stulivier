import { Component } from '@angular/core';
import { PlaylistCardComponent } from '../../../components/playlist-card/playlist-card.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [PlaylistCardComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent {}
