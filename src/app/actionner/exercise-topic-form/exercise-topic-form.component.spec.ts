import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTopicFormComponent } from './exercise-topic-form.component';

describe('ExerciseTopicFormComponent', () => {
  let component: ExerciseTopicFormComponent;
  let fixture: ComponentFixture<ExerciseTopicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExerciseTopicFormComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
