import { Component, Input, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnInit {
  @Input() cardName!: string;

  actionnerList: string[] = [' William', ' Lilit', ' Flo'];

  charb: Charbon = new Charbon(
    'PM1',
    '08/12/2023',
    '20h00',
    'AAP 4, 5 et 6 de PM1 !',
    this.actionnerList,
    'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
  );

  courseType: CourseTypes = CourseTypes.info;
  
  constructor() {}

  ngOnInit(): void {}
}
