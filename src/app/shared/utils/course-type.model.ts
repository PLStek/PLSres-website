export enum CourseType {
  meca = 'ED5858',
  info = 'FFB800',
  maths = '5592EF',
  elec = 'A1CA78',
  undefined = 'CCCCCC',
}

export function getCourseType(value: string): CourseType {
  switch (value) {
    case 'meca':
      return CourseType.meca;
    case 'info':
      return CourseType.info;
    case 'math':
      return CourseType.maths;
    case 'elec':
      return CourseType.elec;
    default:
      return CourseType.undefined;
  }
}

export function getCourseTypeName(value: CourseType): string {
  switch (value) {
    case CourseType.meca:
      return 'meca';
    case CourseType.info:
      return 'info';
    case CourseType.maths:
      return 'math';
    case CourseType.elec:
      return 'elec';
    default:
      return 'undefined';
  }
}
