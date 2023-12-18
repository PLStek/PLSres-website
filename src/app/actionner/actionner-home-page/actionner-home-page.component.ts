import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';

@Component({
  selector: 'app-actionner-home-page',
  templateUrl: './actionner-home-page.component.html',
  styleUrls: ['./actionner-home-page.component.scss']
})
export class ActionnerHomePageComponent implements OnInit {

  newCharbon: Partial<Charbon> = {};

  selectedActionneurs: string[] = []; 
  actionneurs: any[] = [
    { id: '1', name: 'Actionneur 1' },
    { id: '2', name: 'Actionneur 2' },
    { id: '3', name: 'Actionneur 3' },
  ];
  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
   
  }

 addCharbon(): void {
    console.log(this.newCharbon);
  }
}
