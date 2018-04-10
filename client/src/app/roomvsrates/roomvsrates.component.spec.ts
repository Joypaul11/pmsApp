import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomvsratesComponent } from './roomvsrates.component';

describe('RoomvsratesComponent', () => {
  let component: RoomvsratesComponent;
  let fixture: ComponentFixture<RoomvsratesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomvsratesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomvsratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
