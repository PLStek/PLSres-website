import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-actionner-home-page',
  templateUrl: './actionner-home-page.component.html',
  styleUrls: ['./actionner-home-page.component.scss'],
})
export class ActionnerHomePageComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const dummyExercise = new Exercise(
      0,
      'Test exercise',
      1,
      1,
      false,
      'Source'
    );
    if (file) {
      this.exerciseService
        .addExercise(dummyExercise, file)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
