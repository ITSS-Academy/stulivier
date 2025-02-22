import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCoverComponent } from './change-cover.component';

describe('ChangeCoverComponent', () => {
  let component: ChangeCoverComponent;
  let fixture: ComponentFixture<ChangeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
