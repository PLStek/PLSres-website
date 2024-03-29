export class Exercise {
  constructor(
    public id: number,
    public title: string,
    public difficulty: number,
    public topicId: number,
    public isCorrected: boolean,
    public source: string,
    public copyright?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.difficulty = difficulty;
    this.topicId = topicId;
    this.isCorrected = isCorrected;
    this.source = source;
    this.copyright = copyright;
  }
}
