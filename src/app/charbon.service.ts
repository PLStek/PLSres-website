import { Injectable } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';

@Injectable({
  providedIn: 'root'
})
export class CharbonService {

  constructor() { }

  getCharbonList(): Charbon[] {
    var charbonList: Charbon[] = [];
    charbonList.push(
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
    charbonList.push(
      new Charbon(
        'MT3',
        CourseTypes.maths,
        '13/12/2023',
        '20h00',
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.push(
      new Charbon(
        'IF2',
        CourseTypes.info,
        '12/12/2023',
        '20h00',
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    return charbonList; 
  }
}
