import {Component, Inject, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {CreatePlaylistDto} from '../../../models/playlist.model';

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
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss'
})
export class CreatePlaylistDialogComponent {
  visibilitys: Visibility[] = [
    {value: '', viewValue: 'Public'},
    {value: '', viewValue: 'Unlisted'},
    {value: '', viewValue: 'Private'},
  ];
  createPlaylistDto!: CreatePlaylistDto;
}
