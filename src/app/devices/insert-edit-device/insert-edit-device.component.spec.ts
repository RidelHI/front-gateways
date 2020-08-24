import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEditDeviceComponent } from './insert-edit-device.component';

describe('InsertEditDeviceComponent', () => {
  let component: InsertEditDeviceComponent;
  let fixture: ComponentFixture<InsertEditDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEditDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEditDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
