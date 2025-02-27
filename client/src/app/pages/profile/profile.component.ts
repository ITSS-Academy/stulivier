import {Component, inject, Input} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {EditProfileComponent} from '../../dialogs/edit-profile/edit-profile.component';
import {Dialog} from '@angular/cdk/dialog';
import {CreateVideoComponent} from '../../dialogs/create-video/create-video.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, CreateVideoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  dialog = inject(Dialog);

  @Input()username!: string;
  @Input()avatar_url!: string;
  @Input()view!: number;
  @Input()describe!: string;
  @Input()follower!: number;
  @Input()background_url!: string;

  //Nơi chuyển trạng thái người dùng có phải là chủ profile hay không (tạm thời)
  self = true;
  // self = false;
  //--------------------------------------------------------------------------------

  openEditProfileDialog() {
    this.dialog.open(EditProfileComponent, {
      disableClose: true
    });
  }

  openCreateVideoDialog() {
    this.dialog.open(CreateVideoComponent, {
      disableClose: true
    });
  }
}
