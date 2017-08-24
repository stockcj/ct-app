import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ExamService } from './../exam.service';
import { Exam } from '../exam';
import { ExamComponent } from './../examcomponent';
import { Version } from './../version';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ct-exam-update',
  templateUrl: './exam-update.component.html',
  styleUrls: ['./exam-update.component.css']
})
export class ExamUpdateComponent implements OnInit {

  @Input()
  exam: Exam;
  components: ExamComponent[];
  versionarray: Version[];

  error: string;

  examForm: FormGroup;
  examComponent: FormArray;
  versions: FormArray;
  componentArray = ['Reading', 'Reading and Use of English', 'Reading and Writing', 'Writing', 'Listening', 'Speaking'];


  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private route: ActivatedRoute) {
      this.createForm();
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    this.examService.getExam(key).subscribe(exam => {
      this.exam = exam;
      this.examForm.reset({
        examName: this.exam.name
      });
      this.examService.getComponents(key).subscribe(components => {
        this.components = components;
        for (const component of components) {
          const ckey = component.$key;
          this.examService.getVersions(key, ckey).subscribe(versions => {
            component.versions = versions;
            console.log(component);
          });
        }
        this.setComponents(this.components);
      });
    });
  }

  setComponents(components: ExamComponent[]) {
    const componentFGs = components.map(component => this.fb.group(component));
    const componentFormArray = this.fb.array(componentFGs);
    this.examForm.setControl('examComponents', componentFormArray);
  }

  setVersions(versions: Version[]) {
    const versionFGs = versions.map(version => this.fb.group(version));
    const versionFormArray = this.fb.array(versionFGs);
    this.examForm.setControl('versions', versionFormArray);
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

  get version(): FormArray {
    return this.examForm.get('versions') as FormArray;
  }

  onSubmit() {
    this.exam = this.prepareSaveExam();
    console.log(this.exam);
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
