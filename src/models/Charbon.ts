import { CourseTypes } from "./CourseTypes";

export class Charbon {
    constructor(
        public id: number,
        public course: string,
        public courseType: CourseTypes,
        public date: Date,
        public title: string,
        public actionners: string[],
        public description: string,
    ) {
        this.id = id,
        this.course = course,
        this.date = date,
        this.title = title,
        this.actionners = actionners,
        this.description = description
    }
}