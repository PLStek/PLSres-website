import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharbonsPageComponent } from './charbons-page.component';

describe('CharbonsPageComponent', () => {
  let component: CharbonsPageComponent;
  let fixture: ComponentFixture<CharbonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharbonsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharbonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
