import { TestBed } from '@angular/core/testing';

import { ExerciseTopicService } from './services/exercise-topic.service';

describe('ExerciseTopicService', () => {
  let service: ExerciseTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
