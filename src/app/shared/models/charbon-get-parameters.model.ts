import { CourseType } from '../utils/course-type.model';

export enum CharbonSortOption {
  dateAsc = 'date_asc',
  dateDesc = 'date_desc',
  durationAsc = 'duration_asc',
  durationDesc = 'duration_desc',
}

export interface CharbonGetParameters {
  course?: string[];
  courseType?: CourseType;
  minDate?: Date;
  maxDate?: Date;
  offset?: number;
  limit?: number;
  sort ?: CharbonSortOption;
}
