import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { ActionneurService } from 'src/app/shared/services/actionneur.service';

@Component({
  selector: 'app-charbon-card',
  templateUrl: './charbon-card.component.html',
  styleUrls: ['./charbon-card.component.scss'],
})
export class CharbonCardComponent implements OnChanges {
  @Input() charbon!: Charbon;
  @Input() edit: boolean = false;
  isEditing: boolean = false;
  editedCharbon!: Charbon;
  actionneurList: String[] = [];

  constructor(private actionneurService: ActionneurService) {
    this.charbon;
    this.edit;
  }
  ngOnInit(): void {
    this.actionneurService.getActionneurs().subscribe((data) => {
      this.actionneurList = data;
    });
  }
  
  ngOnChanges(): void {
    this.editedCharbon = this.charbon;
  }

  toogleEdit(): void {
    this.isEditing = !this.isEditing;
  }
  confirmEdit(): void {
    //update the charbon
    this.charbon = this.editedCharbon;
    console.log(this.charbon);
    this.isEditing = false;
  }
}
