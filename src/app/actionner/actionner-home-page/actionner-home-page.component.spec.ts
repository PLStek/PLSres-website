import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionnerHomePageComponent } from './actionner-home-page.component';

describe('ActionnerHomePageComponent', () => {
  let component: ActionnerHomePageComponent;
  let fixture: ComponentFixture<ActionnerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ActionnerHomePageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionnerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
