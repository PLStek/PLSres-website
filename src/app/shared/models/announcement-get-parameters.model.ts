export enum AnnouncementSortOption {
  dateAsc = 'date_asc',
  dateDesc = 'date_desc',
  nameAsc = 'name_asc',
  nameDesc = 'name_desc',
}

export interface AnnouncementGetParameters {
  limit?: number;
  offset?: number;
  sort?: AnnouncementSortOption;
}
