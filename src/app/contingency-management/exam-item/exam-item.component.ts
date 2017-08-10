import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from '../exam';

@Component({
  selector: 'ct-exam-item',
  templateUrl: './exam-item.component.html',
  styleUrls: ['./exam-item.component.css']
})
export class ExamItemComponent implements OnInit {

  @Input()
  exam: Exam;

  @Output()
  deleteExamEvent = new EventEmitter<Exam>();

  validateDelete: boolean;

  constructor() { }

  ngOnInit() {
  }

  deleteValidation(value: boolean) {
    this.validateDelete = value;
  }

  delete() {
    this.validateDelete = false;
    this.deleteExamEvent.emit(this.exam);
  }

}
