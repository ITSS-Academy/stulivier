import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardInPagePlaylistComponent } from './playlist-card-in-page-playlist.component';

describe('PlaylistCardInPagePlaylistComponent', () => {
  let component: PlaylistCardInPagePlaylistComponent;
  let fixture: ComponentFixture<PlaylistCardInPagePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCardInPagePlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCardInPagePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
