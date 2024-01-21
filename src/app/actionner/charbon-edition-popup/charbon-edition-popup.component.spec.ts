import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharbonEditionPopup } from './charbon-edition-popup.component';

describe('CharbonEditionPopup', () => {
  let component: CharbonEditionPopup;
  let fixture: ComponentFixture<CharbonEditionPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CharbonEditionPopup]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharbonEditionPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
