import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VideoCardHorizontalComponent} from '../../../components/video-card-horizontal/video-card-horizontal.component';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {VideoCardVerticalComponent} from '../../../components/video-card-vertical/video-card-vertical.component';
import {Observable, Subscription, switchMap, tap} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrxs/video/video.state';
import * as VideoActions from '../../../../ngrxs/video/video.actions';
import * as PlaylistActions from '../../../../ngrxs/playlist/playlist.actions';
import {PlaylistCardComponent} from '../../../components/playlist-card/playlist-card.component';
import {RouterLink} from '@angular/router';
import {PlaylistState} from '../../../../ngrxs/playlist/playlist.state';
import {PlaylistModel} from '../../../../models/playlist.model';
import {UserModel} from '../../../../models/user.model';
import {UserState} from '../../../../ngrxs/user/user.state';
import {filter, take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoCardHorizontalComponent,
    MatButton,
    MatFabButton,
    MatIconModule,
    MatMiniFabButton,
    AsyncPipe,
    VideoCardVerticalComponent,
    PlaylistCardComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  subscription: Subscription[] = [];
  videos$: Observable<VideoModel[]>;
  playlists$: Observable<PlaylistModel[]>;
  user$!: Observable<UserModel>;

  constructor(private store: Store<{ video: VideoState, playlist: PlaylistState, user: UserState }>,
              private renderer: Renderer2, private el: ElementRef) {
    this.user$ = this.store.select('user', 'user');
    this.videos$ = this.store.select('video', 'videos');
    this.user$.pipe(
      filter(user => !!user?.id), // Chỉ lấy khi user có id
      take(1)
    ).subscribe(user => {
    this.store.dispatch(VideoActions.getAllVideos());
    });
    this.playlists$ = this.store.select('playlist', 'playlists');
    this.user$.pipe(
      filter(user => !!user?.id), // Chỉ lấy khi user có id
      take(1)
    ).subscribe(user => {
      this.store.dispatch(PlaylistActions.getPlaylistByUserId({ id: user.id }));
    });


  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('video', 'videos').subscribe((videos) => {
        console.log(videos);
      }),
      this.store.select('playlist', 'playlists').subscribe((playlists) => {
        console.log(playlists);
    }),
    );
    // this.user$.subscribe(user => {
    //   console.log('User from store:', user); // Kiểm tra dữ liệu user
    // });
  }

  ngAfterViewInit() {
    const containers = this.el.nativeElement.querySelectorAll('.data-container');

    containers.forEach((container: HTMLElement) => {
      const data = container.querySelector('.data') as HTMLElement;
      const btnLeft = container.querySelector('.button-left') as HTMLElement;
      const btnRight = container.querySelector('.button-right') as HTMLElement;

      if (data && btnLeft && btnRight) {
        const updateButtonsVisibility = () => {
          if (!data.scrollWidth) return; // Chưa có nội dung thì không làm gì

          btnLeft.style.visibility = data.scrollLeft > 0 ? 'visible' : 'hidden';
          btnRight.style.visibility =
            data.scrollLeft + data.clientWidth >= data.scrollWidth ? 'hidden' : 'visible';
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
          data.scrollBy({ left: -430, behavior: 'smooth' });
          setTimeout(updateButtonsVisibility, 430);
        });

        this.renderer.listen(btnRight, 'click', () => {
          data.scrollBy({ left: 430, behavior: 'smooth' });
          setTimeout(updateButtonsVisibility, 430);
        });

        // Kiểm tra lại sau 500ms nếu dữ liệu load chậm
        setTimeout(updateButtonsVisibility, 500);
      }
    });
  }
}
