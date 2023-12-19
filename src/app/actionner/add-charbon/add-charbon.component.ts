import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-add-charbon',
  templateUrl: './add-charbon.component.html',
  styleUrls: ['./add-charbon.component.scss'],
})
export class AddCharbonComponent implements OnInit {
  newCharbon!: Charbon;
  dateInput: String = '0000-00-00';
  timeInput: String = "00:00:00";

  courseTypeEnum = CourseType;

  constructor(private charbonService: CharbonService) {}

  ngOnInit(): void {
    this.newCharbon = new Charbon(
      0,
      '',
      CourseType.elec,
      new Date(),
      '',
      [],
      ''
    );
  }

  updateDate(): void {
    const newDate = this.dateInput + 'T' + this.timeInput;
    console.log(newDate);
    this.newCharbon.date = new Date(newDate);
  }

  addCharbon(): void {
    console.log(this.newCharbon);
  }
}
