import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardVerticalComponent } from './video-card-vertical.component';

describe('VideoCardVerticalComponent', () => {
  let component: VideoCardVerticalComponent;
  let fixture: ComponentFixture<VideoCardVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCardVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCardVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
