import { CourseType } from './course-type.model';

export class Exercise {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public difficulty: number,
    public isCorrected: boolean,
    public course: string,
    public topic: string,
    public courseType: CourseType,
    public source: string,
    public contentLink: string
  ) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.difficulty = difficulty),
      (this.isCorrected = isCorrected),
      (this.course = course),
      (this.topic = topic),
      (this.courseType = courseType),
      (this.source = source),
      (this.contentLink = contentLink);
  }
}
