import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTopicEditionPopupComponent } from './exercise-topic-edition-popup.component';

describe('ExerciseTopicEditionPopupComponent', () => {
  let component: ExerciseTopicEditionPopupComponent;
  let fixture: ComponentFixture<ExerciseTopicEditionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseTopicEditionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTopicEditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
