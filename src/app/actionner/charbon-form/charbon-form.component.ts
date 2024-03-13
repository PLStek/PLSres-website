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
import { ToastrService } from 'ngx-toastr';

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
  actionneurList: User[] = [];

  CourseType = CourseType;

  get courseListForSelectedType(): Course[] {
    return this.courseList.filter(
      (course) => course.type == this.form.get('courseType')?.value
    );
  }

  constructor(
    private charbonService: CharbonService,
    private courseService: CourseService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();

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
        data.actionneurs?.map((a: User) => a.id),
        data.description,
        data.replayLink,
        data.resourcesLink
      );
    });

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseList = data;
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération de la liste des cours',
          'Erreur'
        );
      },
    });

    this.userService.getActionneurs().subscribe({
      next: (data) => {
        this.actionneurList = data;
        if (this.baseCharbon) {
          this.fillForm(this.baseCharbon, data);
        }
      },
      error: () => {
        this.toastr.error(
          'Erreur lors de la récupération de la liste des actionneurs',
          'Erreur'
        );
      },
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      courseType: new FormControl(CourseType.undefined),
      course: new FormControl('', Validators.required),
      date: new FormControl(undefined, Validators.required),
      actionneurs: new FormControl([], Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      replayLink: new FormControl(''),
      content: new FormControl(null, Validators.required),
    });
  }

  fillForm(charbon: Charbon, actionneurs: User[]): void {
    this.form.setValue({
      title: charbon.title,
      course: charbon.course,
      courseType: charbon.courseType,
      date: charbon.date.toISOString(),
      actionneurs: actionneurs.filter((a) =>
        charbon?.actionneurs.includes(a.id)
      ),
      description: charbon.description,
      replayLink: charbon.replayLink,
      content: null,
    });
  }

  isPassedDate(): boolean {
    const date = new Date(this.form.get('date')?.value);
    return date < new Date();
  }

  onCourseTypeChange() {
    this.form.patchValue({ course: '' });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.form.get('content')?.setValue(file);
  }

  submit(): void {
    this.submitted = true;
    if (!this.form.valid) return;

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
    this.charbonService.addCharbon(newCharbon).subscribe({
      next: (charb) => {
        this.addContent(charb.id, this.form.get('content')?.value);
        this.initForm();
        this.onValidate.emit();
      },
      error: (err) => {},
    });
  }

  private addContent(id: number, content: File) {
    console.log(content);
    this.charbonService.addCharbonContent(id, content).subscribe({
      error: () => {
        this.toastr.error("Erreur lors de l'ajout du contenu", 'Erreur');
      },
    });
  }

  private updateCharbon(newCharbon: CharbonPostParameters): void {
    this.charbonService
      .updateCharbon(this.baseCharbon?.id ?? 0, newCharbon)
      .subscribe({
        next: (charb) => {
          console.log(charb);
          this.initForm();
          this.onValidate.emit();
        },
      });
  }
}
