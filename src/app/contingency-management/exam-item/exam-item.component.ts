import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from '../exam';
import { ExamComponent} from '../examcomponent';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  selectedExam: Exam;
  validateDelete: boolean;

  public arrayofKeys;

  @Input()
  examComponents: Array<ExamComponent>;

  constructor( private router: Router) {
   }

  ngOnInit() {
  }

  onSelect(exam: Exam) {
    console.log('/' + exam.$key);
    this.router.navigate(['/admin/contingency-management', exam.$key]);
  }

  deleteValidation(value: boolean) {
    this.validateDelete = value;
  }

  delete() {
    this.validateDelete = false;
    this.deleteExamEvent.emit(this.exam);
  }

}
