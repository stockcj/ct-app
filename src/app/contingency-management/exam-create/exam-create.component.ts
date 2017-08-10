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

  constructor() { }

  ngOnInit() {
  }

  creatingNewUser(value) {
    this.creatingExam = value;
    this.creatingExamEvent.emit(value);
  }

  onSubmit(userForm) {
    if (userForm.form.valid) {
      this.createExamEvent.emit(this.exam);
    }
  }

  clear() {
    this.exam = new Exam();
  }

}
