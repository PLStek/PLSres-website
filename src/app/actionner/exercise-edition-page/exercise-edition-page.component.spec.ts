import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEditionPageComponent } from './exercise-edition-page.component';

describe('ExerciseEditionPageComponent', () => {
  let component: ExerciseEditionPageComponent;
  let fixture: ComponentFixture<ExerciseEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseEditionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
