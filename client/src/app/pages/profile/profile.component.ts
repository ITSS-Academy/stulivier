import {
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { combineLatest, filter, Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateVideoDialogComponent } from '../../dialogs/create-video-dialog/create-video-dialog.component';
import { EditProfileDialogComponent } from '../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import * as UserActions from '../../../ngrxs/user/user.actions';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  userId$!: Observable<UserModel>; //người dùng khác
  user$!: Observable<UserModel>; //bản thân
  user!: UserModel;
  userById!: UserModel;
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;

  @Input() username!: string;
  @Input() avatar_url!: string;
  @Input() view!: number;
  @Input() describe!: string;
  @Input() follower!: number;
  @Input() background_url!: string;
  self!: boolean; //bản thân
  activeTab = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ user: UserState }>,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.userId$ = this.store.select('user', 'userById');
  }

  triggerCoverInput(): void {
    this.coverInput.nativeElement.click();
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileDialogComponent, {
      minWidth: '1000px',
      disableClose: true,
    });
  }

  openCreateVideoDialog() {
    this.dialog.open(CreateVideoDialogComponent, {
      minWidth: '1000px',
      disableClose: true,
    });
  }

  ngOnInit() {
    // Cập nhật tab khi component khởi tạo
    this.updateActiveTab(this.router.url);

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        // clear state before get user by id
        this.store.dispatch(UserActions.clearUserById());
        this.store.dispatch(VideoActions.clearState());
        this.store.dispatch(PlaylistActions.clearAllPlaylistState());

        const id = params['id'];
        this.store.dispatch(UserActions.getUserById({ userId: id }));
      }),
      // Lắng nghe sự thay đổi của URL trong ActivatedRoute
      this.activatedRoute.url.subscribe(() => {
        this.updateActiveTab(this.router.url);
      }),

      // Lắng nghe sự kiện thay đổi route để cập nhật tab khi chuyển trang
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateActiveTab(event.urlAfterRedirects || event.url);
        }
      }),

      combineLatest([
        this.store.select((state) => state.user.isUpdateChannelImageSuccess),
        this.store.select((state) => state.user.isUpdateAvatarSuccess),
        this.store.select((state) => state.user.isUpdateDescribeSuccess),
      ])
        .pipe(
          filter(
            ([
              isUpdateChannelImageSuccess,
              isUpdateAvatarSuccess,
              isUpdateDescribeSuccess,
            ]) =>
              isUpdateChannelImageSuccess ||
              isUpdateAvatarSuccess ||
              isUpdateDescribeSuccess,
          ),
        )
        .subscribe(() => {
          this.store.dispatch(UserActions.getUser());
        }),
    );
  }

  onTabChange(event: any) {
    const tabIndex = event.index;
    const route = this.getRouteByIndex(tabIndex);
    this.router.navigate([route]);
  }

  updateActiveTab(url: string) {
    if (url.includes('/featured')) {
      this.activeTab = 0;
    } else if (url.includes('/videos')) {
      this.activeTab = 1;
    } else if (url.includes('/playlists')) {
      this.activeTab = 2;
    }
  }

  getRouteByIndex(index: number): string {
    return (
      [
        `profile/${this.user.id}/featured`,
        `profile/${this.user.id}/videos`,
        `profile/${this.user.id}/playlists`,
      ][index] || '/featured'
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(UserActions.clearUserById());
    this.store.dispatch(VideoActions.clearState());
    this.store.dispatch(PlaylistActions.clearAllPlaylistState());
  }
}
