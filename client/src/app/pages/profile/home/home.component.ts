import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VideoCardHorizontalComponent} from '../../../components/video-card-horizontal/video-card-horizontal.component';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {VideoCardVerticalComponent} from '../../../components/video-card-vertical/video-card-vertical.component';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../../../models/video.model';
import {Store} from '@ngrx/store';
import {VideoState} from '../../../../ngrxs/video/video.state';
import * as VideoActions from '../../../../ngrxs/video/video.actions';
import {PlaylistCardComponent} from '../../../components/playlist-card/playlist-card.component';
import {RouterLink} from '@angular/router';

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

  constructor(private store: Store<{ video: VideoState }>,
              private renderer: Renderer2, private el: ElementRef) {
    this.videos$ = this.store.select('video', 'videos');
    this.store.dispatch(VideoActions.getAllVideos());
  }

  ngOnInit() {
    this.subscription.push(
      this.store.select('video', 'videos').subscribe((videos) => {
        console.log(videos);
      }),
    );
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
