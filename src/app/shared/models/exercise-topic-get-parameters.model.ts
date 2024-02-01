import { CourseType } from "../utils/course-type.model";

export interface ExerciseTopicGetParameters {
    courses?: String[];
    courseType?: CourseType;
    sort ?: string;
}