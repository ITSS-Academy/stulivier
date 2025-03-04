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
        this.renderer.listen(btnLeft, 'click', () => {
          data.scrollBy({ left: -300, behavior: 'smooth' });
        });

        this.renderer.listen(btnRight, 'click', () => {
          data.scrollBy({ left: 300, behavior: 'smooth' });
        });
      }
    });
  }
}
