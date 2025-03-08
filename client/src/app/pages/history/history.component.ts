import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { VideoCardHorizontalComponent } from '../../components/video-card-horizontal/video-card-horizontal.component';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { VideoCardVerticalSkeletonComponent } from '../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import * as AuthActions from '../../../ngrxs/auth/auth.actions';

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
  @ViewChild('coverInput') coverInput!: ElementRef<HTMLInputElement>;
  subscriptions: Subscription[] = [];
  videos$: Observable<HistoryModel[]>;
  user!: UserModel | null;
  user$!: Observable<UserModel>;

  coverImage: string | ArrayBuffer | null =
    'https://hybsmigdaummopabuqki.supabase.co/storage/v1/object/public/cover_img//nasa_earth_grid.jpg';

  constructor(
    private store: Store<{
      history: HistoryState;
      user: UserState;
    }>,
  ) {
    this.videos$ = this.store.select((state) => state.history.history);
    this.user$ = this.store.select((state) => state.user.user);
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

  signInWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
