import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEditGatewayComponent } from './insert-edit-gateway.component';

describe('InsertEditGatewayComponent', () => {
  let component: InsertEditGatewayComponent;
  let fixture: ComponentFixture<InsertEditGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertEditGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEditGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
