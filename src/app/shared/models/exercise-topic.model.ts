import { CourseType } from './course-type.model';
export class ExerciseTopic {
  constructor(
    public id: number,
    public topic: string,
    public course: string,
    public courseType: CourseType
  ) {
    this.id = id;
    this.topic = topic;
    this.course = course;
    this.courseType = courseType;
  }
}
