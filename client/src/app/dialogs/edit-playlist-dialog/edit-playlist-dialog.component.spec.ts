import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaylistDialogComponent } from './edit-playlist-dialog.component';

describe('EditPlaylistDialogComponent', () => {
  let component: EditPlaylistDialogComponent;
  let fixture: ComponentFixture<EditPlaylistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlaylistDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlaylistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
