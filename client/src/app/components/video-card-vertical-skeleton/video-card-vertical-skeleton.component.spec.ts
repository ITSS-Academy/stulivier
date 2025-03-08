import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardVerticalSkeletonComponent } from './video-card-vertical-skeleton.component';

describe('VideoCardVerticalSkeletonComponent', () => {
  let component: VideoCardVerticalSkeletonComponent;
  let fixture: ComponentFixture<VideoCardVerticalSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCardVerticalSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCardVerticalSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
