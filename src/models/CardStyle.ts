import { Time } from "@angular/common";

export class CardStyle {
    constructor(
        public style: string,
        public ue: string,
        public date: string,
        public time: string,
        public title: string,
        public actionner: string[],
        public description: string,
    ) {
        this.style = style,
        this.ue = ue,
        this.date = date,
        this.time = time,
        this.title = title,
        this.actionner = actionner,
        this.description = description
    }
}