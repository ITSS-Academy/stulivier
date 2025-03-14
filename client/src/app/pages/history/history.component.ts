import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { UserModel } from '../../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { HistoryModel } from '../../../models/history.model';
import { Store } from '@ngrx/store';
import { HistoryState } from '../../../ngrxs/history/history.state';
import { UserState } from '../../../ngrxs/user/user.state';
import * as HistoryActions from '../../../ngrxs/history/history.actions';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { VideoCardVerticalSkeletonComponent } from '../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';
import { AuthState } from '../../../ngrxs/auth/auth.state';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
    VideoCardVerticalSkeletonComponent,
    NgxSkeletonLoaderComponent,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos$: Observable<HistoryModel[]>;
  user!: UserModel | null;
  user$!: Observable<UserModel>;
  isCheckLogin$!: Observable<boolean>;

  constructor(
    private store: Store<{
      history: HistoryState;
      user: UserState;
      auth: AuthState;
    }>,
  ) {
    this.videos$ = this.store.select((state) => state.history.history);
    this.user$ = this.store.select((state) => state.user.user);
    this.isCheckLogin$ = this.store.select(
      (state) => state.auth.isCheckLoggedIn,
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.user.user)
        .subscribe((user) => {
          this.user = user;
          if (user.id) {
            this.store.dispatch(
              HistoryActions.getHistoryByUserId({ userId: user.id }),
            );
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
