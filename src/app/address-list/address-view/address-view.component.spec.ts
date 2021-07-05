import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressViewComponent } from './address-view.component';

describe('AddressViewComponent', () => {
  let component: AddressViewComponent;
  let fixture: ComponentFixture<AddressViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
