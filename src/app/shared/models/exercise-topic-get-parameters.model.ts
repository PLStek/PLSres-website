import { CourseType } from "../utils/course-type.model";

export interface ExerciseTopicGetParameters {
    id?: number;
    courses?: String[];
    courseType?: CourseType;
    sort ?: string;
}