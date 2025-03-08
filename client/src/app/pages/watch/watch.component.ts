import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import { VideoModel } from '../../../models/video.model';
import { PlaylistDetailModel } from '../../../models/playlist.model';
import { UserModel } from '../../../models/user.model';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { PlaylistState } from '../../../ngrxs/playlist/playlist.state';
import { UserState } from '../../../ngrxs/user/user.state';
import { VideoState } from '../../../ngrxs/video/video.state';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Store } from '@ngrx/store';
import * as VideoActions from '../../../ngrxs/video/video.actions';
import * as PlaylistActions from '../../../ngrxs/playlist/playlist.actions';
import * as CommentActions from '../../../ngrxs/comment/comment.actions';
import { filter, map, take } from 'rxjs/operators';
import { CommentState } from '../../../ngrxs/comment/comment.state';
import { VideoCardVerticalComponent } from '../../components/video-card-vertical/video-card-vertical.component';
import { CommentCardComponent } from '../../components/comment-card/comment-card.component';
import { CommentModel } from '../../../models/comment.model';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    VideoModule,
    VideoCardVerticalComponent,
    CommentCardComponent,
  ],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss',
})
export class WatchComponent implements OnInit, OnDestroy {
  @ViewChild('media', { static: true }) media!: ElementRef;
  @ViewChild('commentInput') commentInput!: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  isDescriptionExpanded = false;
  videoId!: string;
  listId!: string;
  startRadio!: number;
  video$: Observable<VideoModel>;
  video!: VideoModel;
  is_liked!: boolean;
  playlistDetail$: Observable<PlaylistDetailModel>;
  isGetPlaylistByIdSuccess$: Observable<boolean>;
  user!: UserModel | null;
  isGetVideoSuccess$: Observable<boolean>;
  subscription: Subscription[] = [];
  currentTime: number = 0;
  totalDuration: number = 0;
  totalWatchTime: number = 0;
  isPlaying: boolean = false;
  totalViews: number = 0;
  watchHistory: number[] = [];
  videos$!: Observable<VideoModel[]>;
  filteredVideos$!: Observable<VideoModel[]>;
  comment: string = '';
  createCommentFailure: Observable<string>;
  comments$!: Observable<CommentModel[]>;

  // scroll: number = 340;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      video: VideoState;
      user: UserState;
      playlist: PlaylistState;
      comment: CommentState;
    }>,
    private vgApi: VgApiService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.video$ = this.store.select((state) => state.video.video);
    this.isGetVideoSuccess$ = this.store.select(
      (state) => state.video.isGetVideoByIdSuccess,
    );
    this.playlistDetail$ = this.store.select(
      (state) => state.playlist.playlistDetail,
    );
    this.videos$ = this.store.select((state) => state.video.videos);
    this.createCommentFailure = this.store.select(
      (state) => state.comment.createCommentErrorMessage,
    );
    this.comments$ = this.store.select((state) => state.comment.comments);
    this.store.dispatch(VideoActions.getAllVideos());
    this.isGetPlaylistByIdSuccess$ = this.store.select(
      (state) => state.playlist.isGetPlaylistByIdSuccess,
    );
  }

  toggleDescription(): void {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  ngOnInit(): void {
    this.filteredVideos$ = this.store
      .select((state) => state.video.videos)
      .pipe(
        map((videos) => videos.filter((video) => video.id !== this.videoId)),
      );
    this.subscription.push(
      this.createCommentFailure.subscribe((failure) => {
        console.error(failure);
      }),
      this.store.select('user', 'user').subscribe((user) => {
        this.user = user;
      }),
      this.store
        .select('user', 'isGetUserSuccess')
        .pipe(
          filter((isGetSuccess) => isGetSuccess),
          take(1),
        )
        .subscribe(() => {
          combineLatest([
            this.activatedRoute.queryParamMap,
            this.store.select('user', 'isGetUserSuccess'),
            this.store.select('user', 'isGettingUser'),
          ]).subscribe(([params, isGetSuccess, isGetting]) => {
            this.videoId = params.get('v') || '';
            this.listId = params.get('list') || '';
            this.startRadio = Number(params.get('index') || 0);
            this.store.dispatch(VideoActions.getAllVideos());
            this.store.dispatch(
              CommentActions.getCommentsByVideoId({ videoId: this.videoId }),
            );

            if (isGetSuccess && !isGetting) {
              if (this.user) {
                this.store.dispatch(
                  VideoActions.getVideoById({
                    videoId: this.videoId,
                    userId: this.user.id,
                  }),
                );
              }
              if (this.listId) {
                this.store.dispatch(
                  PlaylistActions.getPlaylistById({ id: this.listId }),
                );
              }
            } else {
              this.store.dispatch(
                VideoActions.getVideoById({
                  videoId: this.videoId,
                  userId: null,
                }),
              );
              this.store.dispatch(
                PlaylistActions.getPlaylistById({ id: this.listId as string }),
              );
            }
          });
        }),
      this.isGetVideoSuccess$.subscribe((isGetVideoSuccess) => {
        if (isGetVideoSuccess && this.vgApi) {
          const media = this.vgApi.getDefaultMedia();
          if (media && media.subscriptions) {
            this.setupVideoListeners(media);
          } else {
            console.error('Media or subscriptions is undefined.');
          }
        }
      }),
      this.store
        .select('comment', 'isCreateCommentSuccess')
        .subscribe((isCreateCommentSuccess) => {
          if (isCreateCommentSuccess) {
            this.store.dispatch(
              CommentActions.getCommentsByVideoId({ videoId: this.videoId }),
            );
          }
        }),
      this.isGetPlaylistByIdSuccess$.subscribe((isGetPlaylistByIdSuccess) => {
        if (isGetPlaylistByIdSuccess) {
          setTimeout(() => {
            const containers =
              this.el.nativeElement.querySelectorAll('.data-container');

            containers.forEach((container: HTMLElement) => {
              const data = container.querySelector('.data') as HTMLElement;
              // const btnLeft = container.querySelector('.button-left') as HTMLElement;
              // const btnRight = container.querySelector('.button-right') as HTMLElement;
              // if (!data || !btnLeft || !btnRight) {
              //   console.error('⚠️ :', { data, btnLeft, btnRight });
              //   return;
              // }
              //
              // console.log('✅ Found data container:', data);
              // console.log('👉 Scrolling to:', this.startRadio * 340);

              data.scrollLeft = this.startRadio * 340;
              this.updateButtonsVisibility();
            });
          }, 500); // Đợi lâu hơn để DOM chắc chắn đã render
        }
      }),
      this.video$.subscribe((video) => {
        if (video) {
          this.video = video;
          this.is_liked = video.is_liked;
        }
      }),
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.viewport.scrollToIndex(0, 'smooth');
        }, 100);
      }
    });
  }

  /**
   * Thiết lập các listener để theo dõi thời gian xem video chính xác
   */
  setupVideoListeners(media: any): void {
    // Lấy tổng thời gian của video
    media.subscriptions.loadedMetadata.subscribe(() => {
      this.totalDuration = this.media.nativeElement.duration;
    });

    // Khi video bắt đầu phát
    media.subscriptions.playing.subscribe(() => {
      this.isPlaying = true;
      this.currentTime = this.media.nativeElement.currentTime;
    });

    // Cập nhật thời gian xem khi video phát
    media.subscriptions.timeUpdate.subscribe(() => {
      if (this.isPlaying) {
        const newTime = this.media.nativeElement.currentTime;
        if (newTime > this.currentTime) {
          this.totalWatchTime += newTime - this.currentTime;
        }
        this.currentTime = newTime;
      }
    });

    // Khi video bị tạm dừng
    media.subscriptions.pause.subscribe(() => {
      this.isPlaying = false;
      console.log(
        `Video paused. Total watch time so far: ${this.totalWatchTime}`,
      );
    });

    // Khi video kết thúc
    media.subscriptions.ended.subscribe(() => {
      this.isPlaying = false;
      console.log(`Video ended. Total watch time: ${this.totalWatchTime}`);

      // Nếu người dùng xem trên 30 giây => tính là một lượt xem hợp lệ
      if (this.totalWatchTime >= 30) {
        this.registerView();
      }

      // Reset thời gian xem khi phát lại
      this.totalWatchTime = 0;
      this.currentTime = 0;

      // Play the next video
      this.playNextVideo();
    });
  }

  playNextVideo(): void {
    this.playlistDetail$.pipe(take(1)).subscribe((playlistDetail) => {
      if (
        playlistDetail &&
        playlistDetail.videos &&
        playlistDetail.videos.length > 0
      ) {
        const currentIndex = playlistDetail.videos.findIndex(
          (video) => video.id === this.videoId,
        );
        const nextVideo = playlistDetail.videos[currentIndex + 1];
        if (nextVideo) {
          this.router.navigate(['/watch'], {
            queryParams: {
              v: nextVideo.id,
              list: this.listId,
              index: currentIndex,
            },
          });
        } else {
          console.log('No more videos in the playlist.');
        }
      } else {
        this.filteredVideos$.pipe(take(1)).subscribe((videos) => {
          const currentIndex = videos.findIndex(
            (video) => video.id === this.videoId,
          );
          const nextVideo = videos[currentIndex + 1];
          if (nextVideo) {
            this.router.navigate(['/watch'], {
              queryParams: { v: nextVideo.id },
            });
          } else {
            console.log('No more videos to play.');
          }
          this.store.dispatch(PlaylistActions.clearPlaylistState());
        });
      }
    });
  }

  /**
   * Ghi nhận lượt xem nếu hợp lệ
   */
  registerView(): void {
    const now = Date.now();
    this.watchHistory.push(now);

    // Xóa các lượt xem quá cũ (hơn 5 phút)
    this.watchHistory = this.watchHistory.filter(
      (time) => now - time < 5 * 60 * 1000,
    );

    // Kiểm tra nếu không có spam, tăng số lượt xem và gửi lên server
    if (this.watchHistory.length <= 5) {
      // Giới hạn tối đa 5 lượt xem hợp lệ trong 5 phút
      this.totalViews += 1;
      console.log(
        `Video được tính là một lượt xem hợp lệ (${this.totalViews} lần)`,
      );

      // Gửi lên server cập nhật lượt xem
      this.store.dispatch(VideoActions.increaseViewCount({ id: this.videoId }));
    } else {
      console.log('Phát hiện spam, không tính thêm lượt xem!');
    }
  }

  onPlayerReady(api: VgApiService): void {
    this.vgApi = api; // Lưu trữ API sau khi khởi tạo
  }

  createComment(): void {
    this.store.dispatch(
      CommentActions.createComment({
        comment: {
          content: this.comment,
          video_id: this.videoId,
          user_id: this.user?.id as string,
        },
      }),
    );
    this.comment = '';
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

  toggleReaction() {
    this.is_liked = !this.is_liked;
  }

  focusCommentInput() {
    this.commentInput.nativeElement.focus();
  }

  nextVideo() {
    if (this.watchHistory.length === 0 && this.totalWatchTime >= 30) {
      this.registerView();
    }

    if (this.user) {
      this.store.dispatch(
        VideoActions.updateWatchTime({
          videoId: this.videoId,
          userId: this.user.id,
          watchTime: this.totalWatchTime,
        }),
      );

      if (this.video.is_liked !== this.is_liked) {
        this.store.dispatch(
          VideoActions.toggleReaction({
            videoId: this.videoId,
            userId: this.user?.id as string,
          }),
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.watchHistory.length === 0 && this.totalWatchTime >= 30) {
      this.registerView();
    }
    if (this.user) {
      this.store.dispatch(
        VideoActions.updateWatchTime({
          videoId: this.videoId,
          userId: this.user.id,
          watchTime: this.totalWatchTime,
        }),
      );

      // Lắng nghe updateWatchTimeSuccess rồi mới clearVideo và unsubscribe
      const updateWatchTimeSuccessSub = this.store
        .select('video', 'isUpdateWatchTimeSuccess') // Chọn trạng thái từ store
        .pipe(
          filter((success) => success),
          take(1),
        ) // Lọc khi success = true và lấy duy nhất 1 lần
        .subscribe(() => {
          if (this.video.is_liked !== this.is_liked) {
            this.store.dispatch(
              VideoActions.toggleReaction({
                videoId: this.videoId,
                userId: this.user?.id as string,
              }),
            );
          }
          this.store.dispatch(VideoActions.clearState());
          this.store.dispatch(PlaylistActions.clearAllPlaylistState());
          this.subscription.forEach((sub) => sub.unsubscribe());
        });
    } else {
      // Nếu không có user thì clear và unsubscribe ngay
      this.store.dispatch(VideoActions.clearState());
      this.store.dispatch(PlaylistActions.clearAllPlaylistState());
      this.subscription.forEach((sub) => sub.unsubscribe());
    }
  }

}
