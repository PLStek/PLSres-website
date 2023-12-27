import { CourseType } from '../utils/course-type.model';
export class ExerciseTopic {
  constructor(
    public id: number,
    public topic: string,
    public course: string,
    public courseType: CourseType,
    public exerciseCount: number
  ) {
    this.id = id;
    this.topic = topic;
    this.course = course;
    this.courseType = courseType;
    this.exerciseCount = exerciseCount;
  }
}
