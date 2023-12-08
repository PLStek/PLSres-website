import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/models/Charbon';
import { CourseTypes } from 'src/models/CourseTypes';
import { CharbonService } from './charbon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PLSres';
  charbonList!: Charbon[];

  constructor(service: CharbonService) {
    this.charbonList = service.getCharbonList();
  }

  ngOnInit(): void {}
}
  