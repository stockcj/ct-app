import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Exam } from '../exam';
import { ExamComponent } from './../examcomponent';
import { Version } from './../version';

@Component({
  selector: 'ct-exam-update',
  templateUrl: './exam-update.component.html',
  styleUrls: ['./exam-update.component.css']
})
export class ExamUpdateComponent implements OnInit {

  @Input()
  updatingExam: boolean;
  @Input()
  exam: Exam;
  @Input()
  error: string;

  @Output()
  updatingExamEvent = new EventEmitter<boolean>();

  @Output()
  updateExamEvent = new EventEmitter<Exam>();

  examForm: FormGroup;
  examComponent: FormArray;
  componentArray = ['Reading', 'Reading and Use of English', 'Reading and Writing', 'Writing', 'Listening', 'Speaking'];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.examForm = this.fb.group({
      examName: ['', Validators.required ],
      examComponents: this.fb.array([this.initComponent()])
    });
  }

  initComponent() {
    return this.fb.group({
      name: ['', Validators.required],
      versions: this.fb.array([
        this.initVersion(),
      ])
    });
  }

  initVersion() {
    return this.fb.group({
      name: ['', Validators.required],
      active: ['', Validators.required],
    });
  }

  addComponent() {
    this.examComponents.push(this.initComponent());
  }

  removeComponent(i: number) {
    this.examComponents.removeAt(i);
  }

  addVersion(i?: number, t?: number) {
    const control: FormArray = <FormArray> this.examComponents.at(i).get('versions');
    control.push(this.initVersion());
  }

  removeVersion(i?: number, t?: number) {
    const control: FormArray = <FormArray> this.examComponents.at(i).get('versions');
    control.removeAt(t);
  }

  get examComponents(): FormArray {
    return this.examForm.get('examComponents') as FormArray;
  }

  get versions(): FormArray {
    return this.examForm.get('versions') as FormArray;
  }

  ngOnInit() {}

  updatingExistingExam(value) {
    this.updatingExam = value;
    this.updatingExamEvent.emit(value);
  }

  onSubmit() {
    this.exam = this.prepareSaveExam();
    console.log(this.exam);
    this.updateExamEvent.emit(this.exam);
    this.clear();
  }

  prepareSaveExam(): Exam {
    const formModel = this.examForm.value;

    const examComponentsDeepCopy: ExamComponent[] = formModel.examComponents.map(
      (component: ExamComponent) => Object.assign({}, component)
    );

    const saveExam: Exam = {
      $key: '',
      name: formModel.examName,
      components: examComponentsDeepCopy
    };

    return saveExam;
  }

  clear() {
    this.exam = new Exam();
    this.examForm.reset({});
  }
}
