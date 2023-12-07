import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalCardComponent } from './coal-card.component';

describe('CoalCardComponent', () => {
  let component: CoalCardComponent;
  let fixture: ComponentFixture<CoalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
