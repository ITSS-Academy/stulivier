import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouComponent } from './you.component';

describe('YouComponent', () => {
  let component: YouComponent;
  let fixture: ComponentFixture<YouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
