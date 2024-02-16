import { CourseType } from '../utils/course-type.model';

export class Charbon {
  constructor(
    public id: number,
    public course: string,
    public courseType: CourseType,
    public date: Date,
    public title: string,
    public actionneurs: string[],
    public description: string,
    public replayLink?: string,
    public duration?: number
  ) {
    this.id = id;
    this.course = course;
    this.courseType = courseType;
    this.date = date;
    this.title = title;
    this.actionneurs = actionneurs;
    this.description = description;
    this.replayLink = replayLink;
    this.duration = duration;
  }
}
