import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEditionPopupComponent } from './exercise-edition-popup.component';

describe('ExerciseEditionPopupComponent', () => {
  let component: ExerciseEditionPopupComponent;
  let fixture: ComponentFixture<ExerciseEditionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExerciseEditionPopupComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
