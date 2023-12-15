import { Injectable } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CourseType } from 'src/app/shared/models/course-type.model';

@Injectable({
  providedIn: 'root'
})
export class CharbonService {

  constructor() { }

  getCharbonList(): Charbon[] {
    var charbonList: Charbon[] = [];
    charbonList.push(
      new Charbon(
        1,
        'PM1',
        CourseType.elec,
        new Date(2023, 11, 11, 22,0),
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.push(
      new Charbon(
        2,
        'PM1',
        CourseType.elec,
        new Date(2023, 11, 10, 23,0),
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.push(
      new Charbon(
        3,
        'MT3',
        CourseType.maths,
        new Date(2023, 11, 12, 18,0),
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.push(
      new Charbon(
        4,
        'IF2',
        CourseType.info,
        new Date(2023, 11, 12, 20,0),
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.push(
      new Charbon(
        4,
        'IF2',
        CourseType.info,
        new Date(2023, 11, 12, 20,0),
        'AAP 4, 5 et 6 de PM1 !',
        ['Lilit, Flo, William'],
        'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l’ECA du CC2 en distanciel A22, alors jetez-y un coup d’oeil !'
      )
    );
    charbonList.sort((a: Charbon, b: Charbon) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return charbonList; 
  }
}