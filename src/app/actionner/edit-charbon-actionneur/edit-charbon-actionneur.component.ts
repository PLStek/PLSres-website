import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';


@Component({
  selector: 'app-edit-charbon-actionneur',
  templateUrl: './edit-charbon-actionneur.component.html',
  styleUrls: ['./edit-charbon-actionneur.component.scss']
})
export class EditCharbonActionneurComponent implements OnInit {

  charbonList: Charbon[] = [];
  constructor(private charbonService: CharbonService) { }

  ngOnInit(): void {
    this.charbonService.getCharbonList({limit: 50}).subscribe((charbons) => {
      this.charbonList = charbons;
    });
  }

}
