export enum CourseType {
    meca = "ED5858",
    info = "FFB800",
    maths = "5592EF",
    elec = "A1CA78",
}

export function getCourseType(value: string): CourseType {
    switch (value) {
        case 'meca':
            return CourseType.meca;
        case 'info':
            return CourseType.info;
        case 'maths':
            return CourseType.maths;
        case 'elec':
            return CourseType.elec;
        default:
            return CourseType.meca;
    }
}