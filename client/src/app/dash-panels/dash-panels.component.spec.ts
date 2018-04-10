import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPanelsComponent } from './dash-panels.component';

describe('DashPanelsComponent', () => {
  let component: DashPanelsComponent;
  let fixture: ComponentFixture<DashPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashPanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
