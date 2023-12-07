import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharbonCardComponent } from './charbon-card.component';

describe('CharbonCardComponent', () => {
  let component: CharbonCardComponent;
  let fixture: ComponentFixture<CharbonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharbonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharbonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
