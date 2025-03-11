import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoControlComponent } from './video-control.component';

describe('VideoControlComponent', () => {
  let component: VideoControlComponent;
  let fixture: ComponentFixture<VideoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
