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
      new Exercise(
        1,
        `Parcours d'un arbre binaire de recherche`,
        `Nous allons voir dans cet exercice les différentes façons de parcourir un arbre binaire de recherche.`,
        3,
        true,
        'LO21',
        'Arbres binaires de recherche',
        CourseType.info,
        'Tyuvetou',
        `https://api.github.com/repos/andr3wV/summy/contents/index.html`
      )
    );
    this.exerciseList.push(
      new Exercise(
        2,
        `Parcours d'une liste chaînée`,
        `Nous allons voir dans cet exercice les différentes façons de parcourir une liste chaînée.`,
        2,
        true,
        'LO21',
        'Listes chaînées',
        CourseType.info,
        'Wiqiro',
        `https://api.github.com/repos/andr3wV/summy/contents/index.html`
      )
    );
    this.exerciseList.push(
      new Exercise(
        3,
        `Parcours d'un graphe`,
        `Nous allons voir dans cet exercice les différentes façons de parcourir un graphe.`,
        4,
        true,
        'LO21',
        'Graphes',
        CourseType.info,
        'Wiqiro',
        `https://api.github.com/repos/andr3wV/summy/contents/index.html`
      )
    );
    return this.exerciseList;
  }
}
