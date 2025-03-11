import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {count, Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../models/video.model';
import {UserModel} from '../../../models/user.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../ngrxs/video/video.state';
import {UserState} from '../../../ngrxs/user/user.state';
import {filter, take} from 'rxjs/operators';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {RouterLink} from '@angular/router';
import {EditProfileDialogComponent} from '../../dialogs/edit-profile-dialog/edit-profile-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EditVideoDialogComponent} from '../../dialogs/edit-video-dialog/edit-video-dialog.component';

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
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSortHeader,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    RouterLink
  ],
  templateUrl: './video-control.component.html',
  styleUrl: './video-control.component.scss'
})
export class VideoControlComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'thumbnail', 'title', 'description', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<VideoModel>([]);
  subscription: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  user$!: Observable<UserModel>;
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<{
    video: VideoState,
    user: UserState //test only
  }>,) {
    this.videos$ = this.store.select('video', 'videos');
    this.user$ = this.store.select('user', 'user'); //test only
    this.user$.pipe(
      filter(user => !!user?.id), // Chỉ lấy khi user có id
      take(1)
    ).subscribe(user => {
      this.store.dispatch(VideoActions.getVideosByUserId({ userId: user.id }));
    });
  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('video', 'videos').subscribe((videos) => {
        // console.log(videos);
        this.dataSource.data = videos || [];
        // let total = videos.length || 0;
        // console.log(total);
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
  openDeleteVideoDialog() {
    // this.dialog.open(DeleteVideoDialogComponent, {
    //   minWidth: '1000px',
    //   disableClose: true,
    // });
  }

  protected readonly count = count;
}
