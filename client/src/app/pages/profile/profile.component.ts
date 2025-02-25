import {Component, inject} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {EditProfileComponent} from '../../dialogs/edit-profile/edit-profile.component';
import {Dialog} from '@angular/cdk/dialog';
import {CreateVideoComponent} from '../../dialogs/create-video/create-video.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, CreateVideoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  dialog = inject(Dialog);

  openDialog() {
    this.dialog.open(EditProfileComponent, {

    });
  }
}
