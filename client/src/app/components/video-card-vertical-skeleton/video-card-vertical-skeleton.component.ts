import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Store } from '@ngrx/store';
import { SidebarState } from '../../../ngrxs/sidebar/sidebar.state';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-card-vertical-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './video-card-vertical-skeleton.component.html',
  styleUrl: './video-card-vertical-skeleton.component.scss',
})
export class VideoCardVerticalSkeletonComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isSidebarOpen$!: Observable<boolean>;
  skeletonWidth: string = '310px';
  textWidth: string = 'calc(310px - 50px)';

  constructor(
    private store: Store<{ sidebar: SidebarState }>,
    private router: Router,
  ) {
    this.isSidebarOpen$ = this.store.select('sidebar', 'isSidebarOpen');
  }

  ngOnInit() {
    this.isSidebarOpen$.subscribe((isSidebarOpen) => {
      if (isSidebarOpen) {
        if (this.router.url.includes('/home')) {
          this.skeletonWidth = '310px';
          this.textWidth = 'calc(310px - 50px)';
        }
      } else {
        if (this.router.url.includes('/home')) {
          this.skeletonWidth = '330px';
          this.textWidth = 'calc(330px - 50px)';
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
