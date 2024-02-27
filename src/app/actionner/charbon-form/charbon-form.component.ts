import { CharbonPostParameters } from '../../shared/models/charbon-post-parameters.model';
import { CourseService } from '../../shared/services/course.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Charbon } from 'src/app/shared/models/charbon.model';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { CharbonService } from 'src/app/shared/services/charbon.service';
import { CourseType } from 'src/app/shared/utils/course-type.model';
import { CharbonCardComponent } from '../../charbons/charbon-card/charbon-card.component';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-charbon-form',
  templateUrl: './charbon-form.component.html',
  styleUrls: ['./charbon-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MainButtonComponent,
    CharbonCardComponent,
    NgIf,
  ],
})
export class AddCharbonComponent implements OnInit {
  @Input() baseCharbon?: Charbon;
  @Output() onValidate = new EventEmitter<void>();

  charbonPreview!: Charbon;
  form!: FormGroup;
  submitted = false;

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
      undefined,
      undefined
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

  private requiredCourseType = (control: AbstractControl) =>
    control.value === CourseType.undefined ? { undefinedValue: true } : null;

  initForm(baseCharbon?: Charbon): void {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      course: new FormControl('', Validators.required),
      courseType: new FormControl(
        CourseType.undefined,
        this.requiredCourseType
      ),
      date: new FormControl(undefined, Validators.required),
      actionneurs: new FormControl([], Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      replayLink: new FormControl(''),
    });

    if (baseCharbon) {
      this.form.setValue({
        title: baseCharbon.title,
        course: baseCharbon.course,
        courseType: baseCharbon.courseType,
        date: baseCharbon.date.toISOString(),
        actionneurs: [],
        description: baseCharbon.description,
        replayLink: baseCharbon.replayLink,
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

  submit(): void {
    this.submitted = true;
    if (this.form.valid) {
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
    } else {
      console.log('Formulaire invalide');
    }
  }

  private addCharbon(newCharbon: CharbonPostParameters): void {
    this.charbonService.addCharbon(newCharbon).subscribe({
      next: () => {
        this.initForm();
        this.onValidate.emit();
      },
    });
  }

  private updateCharbon(newCharbon: CharbonPostParameters): void {
    this.charbonService
      .updateCharbon(this.baseCharbon?.id ?? 0, newCharbon)
      .subscribe({
        next: () => {
          this.initForm();
          this.onValidate.emit();
        },
      });
  }
}
