import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfrEstPage } from './afr-est.page';

describe('AfrEstPage', () => {
  let component: AfrEstPage;
  let fixture: ComponentFixture<AfrEstPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfrEstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
