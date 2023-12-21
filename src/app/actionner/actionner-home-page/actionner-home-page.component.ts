import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-actionner-home-page',
  templateUrl: './actionner-home-page.component.html',
  styleUrls: ['./actionner-home-page.component.scss'],
})
export class ActionnerHomePageComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {}
}
