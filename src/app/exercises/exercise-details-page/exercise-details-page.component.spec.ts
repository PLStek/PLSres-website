import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDetailsPageComponent } from './exercise-details-page.component';

describe('ExerciseDetailsPageComponent', () => {
  let component: ExerciseDetailsPageComponent;
  let fixture: ComponentFixture<ExerciseDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExerciseDetailsPageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
