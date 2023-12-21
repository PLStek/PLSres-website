import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciceComponent } from './add-exercice.component';

describe('AddExerciceComponent', () => {
  let component: AddExerciceComponent;
  let fixture: ComponentFixture<AddExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExerciceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
