import { Injectable } from '@angular/core';
import { CourseType } from 'src/models/course-type.model';
import { Exercise } from 'src/models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseList!: Exercise[];

  constructor() {}

  getExerciseList(): Exercise[] {
    this.exerciseList = [];
    this.exerciseList.push(
      new Exercise(1, `Parcours d'un BST`, 3, 1, true, 'Tyuvetou')
    );
    this.exerciseList.push(
      new Exercise(2, `Parcours d'une liste chaînée`, 2, 2, false, 'Wiqiro')
    );
    this.exerciseList.push(
      new Exercise(4, `Inverse d'une liste chaînée`, 3, 2, false, 'Wiqiro')
    );
    this.exerciseList.push(
      new Exercise(3, `Parcours d'un graphe`, 4, 3, true, 'Wiqiro')
    );
    return this.exerciseList;
  }

  getExerciseContent(id: number): string {
    return `<p>Le contenu de l'exercice en HTML sera récupéré du backend</p>`;
  }
}
