import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfrNordPage } from './afr-nord.page';

describe('AfrNordPage', () => {
  let component: AfrNordPage;
  let fixture: ComponentFixture<AfrNordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfrNordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
