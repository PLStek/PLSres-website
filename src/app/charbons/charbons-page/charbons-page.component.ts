import { CharbonGetParameters } from './../../shared/models/charbon-get-parameters.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import {
  CourseType,
  getCourseTypeName,
} from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-charbons-page',
  templateUrl: './charbons-page.component.html',
  styleUrls: ['./charbons-page.component.scss'],
})
export class CharbonsPageComponent implements OnInit {
  title = 'PLSres';
  charbonList: Charbon[] = [];
  nextThreeCharbons: Charbon[] = [];
  selectedCharbon: Charbon | null = null;

  sortForm!: FormGroup;

  courseTypeEnum = CourseType;

  constructor(
    private charbonService: CharbonService,
    private formBuilder: FormBuilder
  ) {}

  //TODO: handle dynamic fetch of charbons 20 par 20
  ngOnInit(): void {
    this.charbonService.getCharbonList({ limit: 50 }).subscribe((charbons) => {
      this.charbonList = charbons;
    });

    this.charbonService
      .getCharbonList({ minDate: new Date(), limit: 3 })
      .subscribe((charbons) => {
        this.nextThreeCharbons = charbons;
      });

    this.sortForm = this.formBuilder.group({
      courseType: CourseType.undefined,
      course: null,
      minDuration: null,
      maxDuration: null,
    });

    this.sortForm.valueChanges.subscribe((data) => {
      const params: CharbonGetParameters = {
        courses: data.course ? [data.course] : undefined,
        courseType: data.courseType === CourseType.undefined ? undefined : data.courseType,
        minDuration: data.minDuration,
        maxDuration: data.maxDuration,
        limit: 50,
      };

      this.charbonService.getCharbonList(params).subscribe((charbons) => {
        this.charbonList = charbons;
      });
    });
  }

  handleSelectedCharbonChange(selectedCharbon: Charbon | null): void {
    this.selectedCharbon = selectedCharbon;
  }
}
