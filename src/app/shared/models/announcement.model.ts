export class Announcement {
  id: number;
  title: string;
  content: string;
  date: Date;

  constructor(id: number, title: string, content: string, date: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date;
  }
}
