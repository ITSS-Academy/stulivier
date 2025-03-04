import {
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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
import { UserModel } from '../../../models/user.model';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { PlaylistModel } from '../../../models/playlist.model';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-playlist-dialog',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss',
})
export class PlaylistDialogComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    private dialogRef: MatDialogRef<PlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videoId: string },
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
