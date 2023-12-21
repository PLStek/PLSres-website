import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConnectionComponent } from './login-popup.component';

describe('FormConnectionComponent', () => {
  let component: FormConnectionComponent;
  let fixture: ComponentFixture<FormConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
