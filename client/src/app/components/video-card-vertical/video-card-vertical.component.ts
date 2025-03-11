import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../../dialogs/playlist-dialog/playlist-dialog.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../../ngrxs/user/user.state';
import { UserModel } from '../../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { SidebarState } from '../../../ngrxs/sidebar/sidebar.state';

@Component({
  selector: 'app-video-card-vertical',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './video-card-vertical.component.html',
  styleUrl: './video-card-vertical.component.scss',
})
export class VideoCardVerticalComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @Input() video!: VideoModel;
  @Input() playlistId: string | undefined;
  @Input() index!: number;
  @Input() highlight = false;
  routerLink!: string;

  readonly dialog = inject(MatDialog);
  subscriptions: Subscription[] = [];
  user!: UserModel;
  isSidebarOpen$!: Observable<boolean>;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store<{
      user: UserState;
      playlist: PlaylistState;
      sidebar: SidebarState;
    }>,
    private alertService: AlertService,
  ) {
    this.isSidebarOpen$ = this.store.select('sidebar', 'isSidebarOpen');
    this.routerLink = this.router.url;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store
        .select('playlist', 'isUpdateWatchLaterPlaylistSuccess')
        .subscribe((isUpdateWatchLaterSuccess) => {
          if (isUpdateWatchLaterSuccess) {
            this.alertService.showAlert(
              'Added to Watch Later',
              'Close',
              3000,
              'end',
              'top',
            );
          }
        }),

      this.store.select('user', 'user').subscribe((user) => {
        if (user) {
          this.user = user;
        }
      }),

      this.isSidebarOpen$.subscribe((isSidebarOpen) => {
        if (isSidebarOpen) {
          if (this.router.url.includes('/history')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '310px',
            );
          } else if (this.router.url.includes('/watch-later')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '310px',
            );
          } else if (this.router.url.includes('/home')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '310px',
            );
          } else if (this.router.url.includes('/category')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '310px',
            );
          }
        } else {
          if (this.router.url.includes('/history')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '340px',
            );
          } else if (this.router.url.includes('/watch-later')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '340px',
            );
          } else if (this.router.url.includes('/home')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '330px',
            );
          } else if (this.router.url.includes('/category')) {
            this.renderer.setStyle(
              this.el.nativeElement.querySelector('.video-card'),
              'width',
              '340px',
            );
          }
        }
      }),
    );
  }

  ngAfterViewInit(): void {
    // if (this.router.url.includes('/watch?')) {
    //   this.renderer.setStyle(
    //     this.el.nativeElement.querySelector('.video-card'),
    //     'width',
    //     '320px',
    //   );
    // }
  }

  onVideoClick(event: Event): void {
    event.preventDefault();
    if (this.playlistId !== undefined) {
      this.router.navigate(['/watch'], {
        queryParams: {
          v: this.video.id,
          list: this.playlistId,
          index: this.index,
        },
      });
      return;
    } else {
      console.log('this.video.id', this.video.id);
      this.router.navigate(['/watch'], {
        queryParams: { v: this.video.id },
      });
      this.store.dispatch(PlaylistActions.clearPlaylistState());
    }
  }

  openDialog(event: MouseEvent) {
    event.stopPropagation();
  }

  openPlaylistDialog() {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      minWidth: 400,
      minHeight: 410,
      data: this.video.id,
      disableClose: true,
    });
  }

  addToWatchLater() {
    if (this.user) {
      this.store.dispatch(
        PlaylistActions.updateWatchLaterPlaylist({
          videoId: this.video.id,
          userId: this.user.id,
        }),
      );
    }
  }

  removeVideoFromWatchLater() {
    this.store.dispatch(
      PlaylistActions.deleteWatchLaterPlaylist({
        videoId: this.video.id,
        userId: this.user.id,
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
