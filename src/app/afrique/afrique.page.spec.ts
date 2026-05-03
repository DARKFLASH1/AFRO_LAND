import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfriquePage } from './afrique.page';

describe('AfriquePage', () => {
  let component: AfriquePage;
  let fixture: ComponentFixture<AfriquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
