import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleRoomComponent } from './add-single-room.component';

describe('AddSingleRoomComponent', () => {
  let component: AddSingleRoomComponent;
  let fixture: ComponentFixture<AddSingleRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSingleRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSingleRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
