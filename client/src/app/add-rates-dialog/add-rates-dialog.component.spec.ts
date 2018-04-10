import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatesDialogComponent } from './add-rates-dialog.component';

describe('AddRatesDialogComponent', () => {
  let component: AddRatesDialogComponent;
  let fixture: ComponentFixture<AddRatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
