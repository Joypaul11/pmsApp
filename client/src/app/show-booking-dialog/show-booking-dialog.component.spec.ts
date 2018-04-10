import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookingDialogComponent } from './show-booking-dialog.component';

describe('ShowBookingDialogComponent', () => {
  let component: ShowBookingDialogComponent;
  let fixture: ComponentFixture<ShowBookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
