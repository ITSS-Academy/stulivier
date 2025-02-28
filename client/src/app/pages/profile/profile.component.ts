import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { EditProfileComponent } from '../../dialogs/edit-profile/edit-profile.component';
import { CreateVideoComponent } from '../../dialogs/create-video/create-video.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { Observable } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  readonly dialog = inject(MatDialog);
  user$!: Observable<UserModel>;
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;

  coverImage: string | ArrayBuffer | null =
    'https://hybsmigdaummopabuqki.supabase.co/storage/v1/object/public/cover_img//nasa_earth_grid.jpg';
  @Input() username!: string;
  @Input() avatar_url!: string;
  @Input() view!: number;
  @Input() describe!: string;
  @Input() follower!: number;
  @Input() background_url!: string;
  self = true;

  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>,
  ) {
    this.user$ = this.store.select('user', 'user');
  }

  triggerCoverInput(): void {
    this.coverInput.nativeElement.click();
  }

  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.coverImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileComponent, {
      minWidth: '1000px',
      disableClose: true,
    });
  }

  openCreateVideoDialog() {
    this.dialog.open(CreateVideoComponent, {
      minWidth: '1000px',
      disableClose: true,
    });
  }

  onTabChange(event: any) {
    const tabIndex = event.index;
    let route = '';
    switch (tabIndex) {
      case 0:
        route = 'profile/featured';
        break;
      case 1:
        route = 'profile/videos';
        break;
      case 2:
        route = 'profile/playlists';
        break;
    }
    this.router.navigate([route]);
  }
}
