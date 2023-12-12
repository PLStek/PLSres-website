import { Injectable } from '@angular/core';
import { CourseTypes } from 'src/models/CourseTypes';
import { Exercise } from 'src/models/Exercise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exerciseList!: Exercise[];

  constructor(private http: HttpClient) {}

  getExerciseList(): Exercise[] {
    this.exerciseList = [];
    this.exerciseList.push(
      new Exercise(
        1,
        `Parcours d'un arbre binaire de recherche`,
        `Nous allons voir dans cet exercice les différentes façons de parcourir un arbre binaire de recherche.`,
        2,
        true,
        'LO21',
        'Arbres binaires de recherche',
        CourseTypes.info,
        'Tyuvetou',
        `https://api.github.com/repos/andr3wV/summy/contents/index.html`
      )
    );
    return this.exerciseList;
  }
}
