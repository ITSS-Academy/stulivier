import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { count, Observable, Subscription } from 'rxjs';
import { VideoModel } from '../../../models/video.model';
import { UserModel } from '../../../models/user.model';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../ngrxs/video/video.state';
import { UserState } from '../../../ngrxs/user/user.state';
import { filter, take } from 'rxjs/operators';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule,
  MatTableDataSource,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { EditProfileDialogComponent } from '../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditVideoDialogComponent } from '../../dialogs/edit-video-dialog/edit-video-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-video-control',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    AsyncPipe,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    MatTable,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    RouterLink,
  ],
  templateUrl: './video-control.component.html',
  styleUrl: './video-control.component.scss',
})
export class VideoControlComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'thumbnail',
    'title',
    'description',
    'created_at',
    'actions',
  ];
  dataSource = new MatTableDataSource<VideoModel>([]);
  subscription: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  user$!: Observable<UserModel>;
  user!: UserModel;
  isDeleteVideoSuccess$!: Observable<boolean>;
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<{
      video: VideoState;
      user: UserState;
    }>,
    private alertService: AlertService,
  ) {
    this.videos$ = this.store.select('video', 'videos');
    this.user$ = this.store.select('user', 'user'); //test only
    this.isDeleteVideoSuccess$ = this.store.select(
      'video',
      'isDeleteVideoSuccess',
    );
  }

  ngOnInit() {
    this.subscription.push(
      this.user$
        .pipe(
          filter((user) => !!user?.id), // Chỉ lấy khi user có id
          take(1),
        )
        .subscribe((user) => {
          this.user = user;
          this.store.dispatch(
            VideoActions.getVideosByUserId({ userId: user.id }),
          );
        }),
      this.store.select('video', 'videos').subscribe((videos) => {
        this.dataSource.data = videos || [];
      }),
      this.isDeleteVideoSuccess$.subscribe((isDeleteVideoSuccess) => {
        if (isDeleteVideoSuccess) {
          this.alertService.showAlert(
            `Delete video successfully.`,
            'Close',
            3000,
            'end',
            'top',
          );
          this.store.dispatch(
            VideoActions.getVideosByUserId({ userId: this.user.id }),
          );
        }
      }),
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { timeZone: 'Asia/Bangkok' });
  }

  openEditVideoDialog(video: VideoModel) {
    this.dialog.open(EditVideoDialogComponent, {
      minWidth: '1000px',
      disableClose: true,
      data: { video: video },
    });
  }

  openDeleteVideoDialog(video: VideoModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        message:
          'Are you sure you want to delete this video? This action cannot be undone.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(VideoActions.deleteVideo({ id: video.id }));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
