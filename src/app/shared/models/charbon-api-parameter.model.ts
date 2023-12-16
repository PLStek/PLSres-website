import { CourseType } from '../utils/course-type.model';

export class CharbonApiParameter {
  constructor(
    public courses?: String[],
    public courseType?: CourseType,
    public minDate?: Date,
    public maxDate?: Date,
    public minDuration?: number,
    public maxDuration?: number,
    public hasDurationOnly?: boolean,
    public offset?: number,
    public limit?: number
  ) {
    this.courses = courses;
    this.courseType = courseType;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.minDuration = minDuration;
    this.maxDuration = maxDuration;
    this.hasDurationOnly = hasDurationOnly;
    this.offset = offset;
    this.limit = limit;
  }
}
