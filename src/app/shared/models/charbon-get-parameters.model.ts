import { CourseType } from '../utils/course-type.model';

export interface CharbonGetParameters {
  course?: String[];
  courseType?: CourseType;
  minDate?: Date;
  maxDate?: Date;
  offset?: number;
  limit?: number;
  sort ?: string;
}
