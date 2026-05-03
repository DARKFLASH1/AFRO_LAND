import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfrCentrePage } from './afr-centre.page';

describe('AfrCentrePage', () => {
  let component: AfrCentrePage;
  let fixture: ComponentFixture<AfrCentrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfrCentrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
