import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharbonEditionPageComponent } from './charbon-edition-page.component';

describe('CharbonEditionPageComponent', () => {
  let component: CharbonEditionPageComponent;
  let fixture: ComponentFixture<CharbonEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharbonEditionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharbonEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
