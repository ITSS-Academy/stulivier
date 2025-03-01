import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistDialogComponent } from './create-playlist-dialog.component';

describe('CreatePlaylistDialogComponent', () => {
  let component: CreatePlaylistDialogComponent;
  let fixture: ComponentFixture<CreatePlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlaylistDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
