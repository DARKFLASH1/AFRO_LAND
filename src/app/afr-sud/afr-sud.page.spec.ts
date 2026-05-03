import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfrSudPage } from './afr-sud.page';

describe('AfrSudPage', () => {
  let component: AfrSudPage;
  let fixture: ComponentFixture<AfrSudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AfrSudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
