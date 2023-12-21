import { CharbonPostParameters } from './../../shared/models/charbon-post-parameters.model';
import { CoursesService } from './../../shared/services/courses.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import { ActionneurService } from 'src/app/shared/services/actionneur.service';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-add-charbon',
  templateUrl: './add-charbon.component.html',
  styleUrls: ['./add-charbon.component.scss'],
})
export class AddCharbonComponent implements OnInit {
  @Input() baseCharbon?: Charbon;

  charbonPreview!: Charbon;
  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  actionneurList: User[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private charbonService: CharbonService,
    private courseService: CoursesService,
    private actionneurService: ActionneurService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.charbonPreview = new Charbon(
      0,
      '',
      CourseType.undefined,
      new Date('2023T20:00'),
      '',
      [],
      '',
      '',
      ''
    );

    this.form = this.formBuilder.group({
      title: '',
      course: '',
      courseType: CourseType.undefined,
      date: new Date('2023T20:00'),
      actionneurs: [],
      description: '',
      replayLink: '',
      resourcesLink: '',
    });

    if (this.baseCharbon) {
      this.form.patchValue({
        title: this.baseCharbon.title,
        course: this.baseCharbon.course,
        courseType: this.baseCharbon.courseType,
        date: this.baseCharbon.date.toISOString(),
        description: this.baseCharbon.description,
        replayLink: this.baseCharbon.replayLink,
        resourcesLink: this.baseCharbon.resourcesLink,
      });
    }
    
    this.form.valueChanges.subscribe((data) => {
      this.charbonPreview = new Charbon(
        0,
        data.course,
        data.courseType,
        new Date(data.date),
        data.title,
        data.actionneurs?.map((a: User) => a.username),
        data.description,
        data.replayLink,
        data.resourcesLink
      );
    });

    this.form.get('courseType')?.valueChanges.subscribe((data) => {
      this.updateCourseList();
      this.form.get('course')?.setValue('');
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });

    this.actionneurService.getActionneurs().subscribe((data) => {
      this.actionneurList = data;
      this.form
        .get('actionneurs')
        ?.setValue(
          data.filter((a) => this.baseCharbon?.actionneurs.includes(a.username))
        );
    });
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  updateCharbon(): void {
    console.log(this.form.value);
  }

  addCharbon(): void {
    let newCharbon: CharbonPostParameters = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      date: new Date(this.form.get('date')?.value),
      course: this.form.get('course')?.value,
      actionneurs: this.form.get('actionneurs')?.value.map((a: User) => a.id),
      replayLink: this.form.get('replayLink')?.value,
      resourcesLink: this.form.get('resourcesLink')?.value,
    };

    this.charbonService.addCharbon(newCharbon).subscribe((data) => {
      console.log(data);
    });
  }
}
