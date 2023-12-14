export function getCourseTypeColor(courseType: string): string {
  switch (courseType) {
    case 'meca':
      return 'ED5858';
    case 'info':
      return 'FFB800';
    case 'maths':
      return '5592EF';
    case 'elec':
      return 'A1CA78';
    default:
      return 'FFFFFF';
  }
}
