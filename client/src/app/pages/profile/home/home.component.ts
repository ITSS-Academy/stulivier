import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { VideoCardVerticalComponent } from '../../../components/video-card-vertical/video-card-vertical.component';
import { Observable, Subscription } from 'rxjs';
import { VideoModel } from '../../../../models/video.model';
import { Store } from '@ngrx/store';
import { VideoState } from '../../../../ngrxs/video/video.state';
import * as VideoActions from '../../../../ngrxs/video/video.actions';
import * as PlaylistActions from '../../../../ngrxs/playlist/playlist.actions';
import { PlaylistCardComponent } from '../../../components/playlist-card/playlist-card.component';
import { RouterLink } from '@angular/router';
import { PlaylistState } from '../../../../ngrxs/playlist/playlist.state';
import {
  PlaylistModel,
  PlaylistResponseModel,
} from '../../../../models/playlist.model';
import { UserModel } from '../../../../models/user.model';
import { UserState } from '../../../../ngrxs/user/user.state';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { VideoCardVerticalSkeletonComponent } from '../../../components/video-card-vertical-skeleton/video-card-vertical-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatMiniFabButton,
    AsyncPipe,
    VideoCardVerticalComponent,
    PlaylistCardComponent,
    RouterLink,
    DatePipe,
    NgxSkeletonLoaderComponent,
    VideoCardVerticalSkeletonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  playlists$: Observable<PlaylistModel[]>;
  playlistDetail$: Observable<PlaylistResponseModel[]>;
  userId$!: Observable<UserModel>; //người dùng khác
  user$!: Observable<UserModel>; //bản thân
  userById!: UserModel;
  randomVideo!: VideoModel | null;

  constructor(
    private store: Store<{
      video: VideoState;
      playlist: PlaylistState;
      user: UserState;
    }>,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.user$ = this.store.select('user', 'user');
    this.userId$ = this.store.select('user', 'userById');
    this.videos$ = this.store.select('video', 'videos');
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.playlistDetail$ = this.store.select('playlist', 'playlistWithVideos');
  }

  ngOnInit() {
    this.subscription.push(
      this.userId$.subscribe((userId) => {
        if (userId.id) {
          this.userById = userId;
          this.store.dispatch(
            VideoActions.getVideosByUserId({ userId: this.userById.id }),
          );
          this.store.dispatch(
            PlaylistActions.getPlaylistByUserId({ id: this.userById.id }),
          );
          this.store.dispatch(
            PlaylistActions.getPlaylistWithVideos({
              userId: this.userById.id,
            }),
          );
        }
      }),
      this.videos$.subscribe((videos) => {
        this.updateButtonsVisibility();
        if (videos.length > 0) {
          this.randomVideo = videos[Math.floor(Math.random() * videos.length)];
        }
      }),

      this.playlists$.subscribe((playlists) => {
        this.updateButtonsVisibility();
      }),
    );

    setTimeout(() => {
      this.updateButtonsVisibility();
    }, 5000);
  }

  updateButtonsVisibility() {
    const containers =
      this.el.nativeElement.querySelectorAll('.data-container');

    containers.forEach((container: HTMLElement) => {
      const data = container.querySelector('.data') as HTMLElement;
      const btnLeft = container.querySelector('.button-left') as HTMLElement;
      const btnRight = container.querySelector('.button-right') as HTMLElement;

      if (data && btnLeft && btnRight) {
        const updateButtonsVisibility = () => {
          if (!data.scrollWidth) return; // Chưa có nội dung thì không làm gì

          btnLeft.style.visibility = data.scrollLeft > 0 ? 'visible' : 'hidden';
          btnRight.style.visibility =
            data.scrollLeft + data.clientWidth >= data.scrollWidth
              ? 'hidden'
              : 'visible';
        };

        // Lắng nghe sự thay đổi của nội dung bên trong data
        const observer = new MutationObserver(() => {
          updateButtonsVisibility();
        });

        observer.observe(data, { childList: true, subtree: true });

        // Lắng nghe sự kiện cuộn
        this.renderer.listen(data, 'scroll', updateButtonsVisibility);

        // Lắng nghe click để cập nhật nút sau khi cuộn
        this.renderer.listen(btnLeft, 'click', () => {
          data.scrollBy({ left: -340, behavior: 'smooth' });
          setTimeout(updateButtonsVisibility, 340);
        });

        this.renderer.listen(btnRight, 'click', () => {
          data.scrollBy({ left: 340, behavior: 'smooth' });
          setTimeout(updateButtonsVisibility, 340);
        });

        // Kiểm tra lại sau 500ms nếu dữ liệu load chậm
        setTimeout(updateButtonsVisibility, 500);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
