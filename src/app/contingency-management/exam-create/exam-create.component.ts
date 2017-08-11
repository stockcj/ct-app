import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Exam } from '../exam';
import { ExamComponent } from './../examcomponent';
import { Version } from './../version';

@Component({
  selector: 'ct-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  @Input()
  creatingExam: boolean;
  @Input()
  exam: Exam;
  @Input()
  error: string;

  @Output()
  creatingExamEvent = new EventEmitter<boolean>();

  @Output()
  createExamEvent = new EventEmitter<Exam>();

  components = ['Reading', 'Reading and Use of English', 'Reading and Writing', 'Writing', 'Listening', 'Speaking'];

  checkedComponents = [];

  constructor() {}

  ngOnInit() {}

  onChange(component: string, isChecked: boolean) {
    if (isChecked) {
      this.checkedComponents.push(component);
    } else {
      const index = this.checkedComponents.indexOf(component);
      if (index > -1) {
        this.checkedComponents.splice(index, 1);
      }
    }
    this.exam.components = this.checkedComponents;
  }

  creatingNewExam(value) {
    this.creatingExam = value;
    this.creatingExamEvent.emit(value);
  }

  onSubmit(userForm) {
    if (userForm.form.valid) {
      this.createExamEvent.emit(this.exam);
      this.checkedComponents = [];
      this.clear();
    }
  }

  clear() {
    this.exam = new Exam();
  }

}
