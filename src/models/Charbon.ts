import { CourseTypes } from "./CourseTypes";

export class Charbon {
    constructor(
        public course: string,
        public courseType: CourseTypes,
        public date: string,
        public time: string,
        public title: string,
        public actionners: string[],
        public description: string,
    ) {
        this.course = course,
        this.date = date,
        this.time = time,
        this.title = title,
        this.actionners = actionners,
        this.description = description
    }
}