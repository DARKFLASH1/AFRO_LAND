import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaysPage } from './pays.page';

describe('PaysPage', () => {
  let component: PaysPage;
  let fixture: ComponentFixture<PaysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
