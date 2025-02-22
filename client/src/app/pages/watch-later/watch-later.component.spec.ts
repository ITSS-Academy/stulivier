import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterComponent } from './watch-later.component';

describe('WatchLaterComponent', () => {
  let component: WatchLaterComponent;
  let fixture: ComponentFixture<WatchLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchLaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
