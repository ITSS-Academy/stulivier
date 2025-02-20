import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardHorizontalComponent } from './video-card-horizontal.component';

describe('VideoCardHorizontalComponent', () => {
  let component: VideoCardHorizontalComponent;
  let fixture: ComponentFixture<VideoCardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCardHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
