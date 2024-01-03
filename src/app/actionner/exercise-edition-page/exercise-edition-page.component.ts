import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ExerciseEditionPopupComponent } from '../exercise-edition-popup/exercise-edition-popup.component';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-exercise-edition-page',
  templateUrl: './exercise-edition-page.component.html',
  styleUrls: ['./exercise-edition-page.component.scss'],
})
export class ExerciseEditionPageComponent implements OnInit {
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }
}
