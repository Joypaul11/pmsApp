import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityAddComponent } from './amenity-add.component';

describe('AmenityAddComponent', () => {
  let component: AmenityAddComponent;
  let fixture: ComponentFixture<AmenityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
