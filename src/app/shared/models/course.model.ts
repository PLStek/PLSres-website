import { CourseType } from './../utils/course-type.model';

export class Course {
  constructor(public id: string, public type: CourseType) {
    this.id = id;
    this.type = type;
  }
}
