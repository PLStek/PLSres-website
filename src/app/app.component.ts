import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];

  ngOnInit(): void {
    this.charbonList = [];
    this.charbonList.push(
      new Charbon(
        'PM1',
        CourseTypes.elec,
        '08/12/2023',
        '20h00',
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    this.charbonList.push(
      new Charbon(
        'PM1',
        CourseTypes.maths,
        '08/12/2023',
        '20h00',
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    this.charbonList.push(
      new Charbon(
        'PM1',
        CourseTypes.info,
        '08/12/2023',
        '20h00',
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
  }
}
