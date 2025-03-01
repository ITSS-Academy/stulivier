import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoverDialogComponent } from './change-cover-dialog.component';

describe('ChangeCoverDialogComponent', () => {
  let component: ChangeCoverDialogComponent;
  let fixture: ComponentFixture<ChangeCoverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCoverDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
