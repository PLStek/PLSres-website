import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorButtonComponent } from './color-button.component';

describe('ColorButtonComponent', () => {
  let component: ColorButtonComponent;
  let fixture: ComponentFixture<ColorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ColorButtonComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
