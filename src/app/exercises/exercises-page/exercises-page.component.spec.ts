import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesPageComponent } from './exercises-page.component';

describe('ExercisesPageComponent', () => {
  let component: ExercisesPageComponent;
  let fixture: ComponentFixture<ExercisesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ExercisesPageComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
