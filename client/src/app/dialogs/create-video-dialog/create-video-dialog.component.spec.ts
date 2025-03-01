import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVideoDialogComponent } from './create-video-dialog.component';

describe('CreateVideoDialogComponent', () => {
  let component: CreateVideoDialogComponent;
  let fixture: ComponentFixture<CreateVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVideoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
