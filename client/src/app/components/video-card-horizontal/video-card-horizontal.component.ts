import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import { Observable, Subscription } from 'rxjs';
import { UserState } from '../../../ngrxs/user/user.state';
import { UserModel } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import { PlaylistDialogComponent } from '../../dialogs/playlist-dialog/playlist-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-video-card-horizontal',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule],
  templateUrl: './video-card-horizontal.component.html',
  styleUrls: ['./video-card-horizontal.component.scss'],
})
export class VideoCardHorizontalComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscriptions: Subscription[] = [];
  user$: Observable<UserModel>;
  user!: UserModel;
  @Input() video!: VideoModel;
  @Output() removeVideoInPlaylistEvent = new EventEmitter<VideoModel>();
  routerLink!: string;
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private store: Store<{ playlist: PlaylistState; user: UserState }>,
    private alertService: AlertService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.routerLink = this.router.url;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select('user', 'user').subscribe((user: UserModel) => {
        if (user.id) {
          this.user = user;
        }
      }),
      this.store
        .select('playlist', 'isDeleteWatchLaterPlaylistSuccess')
        .subscribe((isRemoveVideoInWatchLaterPlaylistSuccess) => {
          if (isRemoveVideoInWatchLaterPlaylistSuccess) {
            this.alertService.showAlert(
              'Deleted from Watch Later',
              'Close',
              3000,
              'end',
              'top',
            );
          }
        }),
    );
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('/watch?')) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.card'),
        'height',
        'calc(180px / 16 * 9)',
      );
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#img-container'),
        'width',
        '150px',
      );
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#img-container'),
        'height',
        'calc(150px / 16 * 9)',
      );
    } else if (this.router.url.includes('/results')) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.card'),
        'height',
        'calc(550px / 16 * 9)',
      );
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#img-container'),
        'width',
        '520px',
      );
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('#img-container'),
        'height',
        'calc(520px / 16 * 9)',
      );
    }
  }

  onVideoClick(video: VideoModel) {
    this.router.navigate(['/watch'], {
      queryParams: { v: video.id },
    });
    this.store.dispatch(PlaylistActions.clearPlaylistState());
  }

  removeVideoInPlaylist() {
    this.removeVideoInPlaylistEvent.emit(this.video);
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

  onImgError(event: any) {
    event.target.src = 'assets/images/default-avatar.jpg';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
