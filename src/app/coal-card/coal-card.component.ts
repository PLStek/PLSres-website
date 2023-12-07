import { Component, Input, OnInit } from '@angular/core';
import { CardStyle } from 'src/models/CardStyle';

@Component({
  selector: 'app-coal-card',
  templateUrl: './coal-card.component.html',
  styleUrls: ['./coal-card.component.scss']
})
export class CoalCardComponent implements OnInit {

  @Input() cardName !: string;

  actionnerList: string[] = [' William', ' Lilit', ' Flo']

  cardStyleMap = new Map<string, CardStyle>([
    ['math', new CardStyle('math-style', 'PM1', '08/12/2023', '20h00', 'AAP 4, 5 et 6 de PM1 !', this.actionnerList, 'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !')],
    ['info', new CardStyle('info-style', 'IF2', '08/12/2023', '20h00', 'AAP 4, 5 et 6 de PM1 !', this.actionnerList, 'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !')],
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
