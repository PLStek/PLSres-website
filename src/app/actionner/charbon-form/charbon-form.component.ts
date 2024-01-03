import { CharbonPostParameters } from '../../shared/models/charbon-post-parameters.model';
import { CourseService } from '../../shared/services/course.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';

@Component({
  selector: 'app-charbon-form',
  templateUrl: './charbon-form.component.html',
  styleUrls: ['./charbon-form.component.scss'],
})
export class AddCharbonComponent implements OnInit {
  @Input() baseCharbon?: Charbon;
  @Output() onValidate = new EventEmitter<void>();

  charbonPreview!: Charbon;
  form!: FormGroup;

  courseList: Course[] = [];
  courseListForSelectedType: Course[] = [];
  actionneurList: User[] = [];

  courseTypeEnum = CourseType;

  constructor(
    private charbonService: CharbonService,
    private courseService: CourseService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm(this.baseCharbon);

    this.charbonPreview = new Charbon(
      0,
      '',
      CourseType.undefined,
      new Date('2023-01-01T20:00'),
      '',
      [],
      '',
      '',
      ''
    );

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

    this.form.get('courseType')?.valueChanges.subscribe(() => {
      this.updateCourseList();
      this.form.get('course')?.setValue('');
    });

    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.updateCourseList();
    });

    this.userService.getActionneurs().subscribe((data) => {
      this.actionneurList = data;
      this.form
        .get('actionneurs')
        ?.setValue(
          data.filter((a) => this.baseCharbon?.actionneurs.includes(a.username))
        );
    });
  }

  initForm(baseCharbon?: Charbon): void {
    if (baseCharbon) {
      this.form = this.formBuilder.group({
        title: baseCharbon.title,
        course: baseCharbon.course,
        courseType: baseCharbon.courseType,
        date: baseCharbon.date.toISOString(),
        actionneurs: [],
        description: baseCharbon.description,
        replayLink: baseCharbon.replayLink,
        resourcesLink: baseCharbon.resourcesLink,
      });
    } else {
      this.form = this.formBuilder.group({
        title: '',
        course: '',
        courseType: CourseType.undefined,
        date: '2023T20:00',
        actionneurs: [],
        description: '',
        replayLink: '',
        resourcesLink: '',
      });
    }
  }

  updateCourseList(): void {
    this.courseListForSelectedType = this.courseList.filter(
      (course) => course.type === this.form.get('courseType')?.value
    );
  }

  isPassedDate(): boolean {
    const date = new Date(this.form.get('date')?.value);
    return date < new Date();
  }

  validate(): void {
    let newCharbon: CharbonPostParameters = {
      ...this.form.value,
      actionneurs: this.form.get('actionneurs')?.value.map((a: User) => a.id),
      replayLink: this.isPassedDate()
        ? this.form.get('replayLink')?.value
        : undefined,
      date: new Date(this.form.get('date')?.value),
    };

    this.baseCharbon
      ? this.updateCharbon(newCharbon)
      : this.addCharbon(newCharbon);
  }

  private addCharbon(newCharbon: CharbonPostParameters): void {
    this.charbonService.addCharbon(newCharbon).subscribe((success) => {
      if (success) {
        this.initForm();
        this.onValidate.emit();
      }
    });
  }

  private updateCharbon(newCharbon: CharbonPostParameters): void {
    this.charbonService
      .updateCharbon(this.baseCharbon?.id ?? 0, newCharbon)
      .subscribe((success) => {
        if (success) {
          this.initForm();
          this.onValidate.emit();
        }
      });
  }
}
