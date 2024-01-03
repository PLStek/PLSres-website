import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharbonComponent } from './charbon-form.component';

describe('AddCharbonComponent', () => {
  let component: AddCharbonComponent;
  let fixture: ComponentFixture<AddCharbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCharbonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
