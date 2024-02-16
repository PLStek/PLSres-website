import { CourseType } from '../utils/course-type.model';

export interface ExerciseTopicGetParameters {
  courses?: string[];
  courseType?: CourseType;
  sort?: string;
}
