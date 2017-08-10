import { Observable } from 'rxjs/Observable';
import { ExamService } from './exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from './exam';
import { ExamComponent } from './examcomponent';
import { Version } from './version';

@Component({
  selector: 'ct-contingency-management',
  templateUrl: './contingency-management.component.html'
})
export class ContingencyManagementComponent implements OnInit {

  exams: Observable<Exam[]>;

  creatingExam: boolean;
  exam: Exam;
  error: string;

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.exam = new Exam();
    this.exams = this.examService.getExams();
  }

  creatingExamEvent(value) {
    this.creatingExam = value;
  }

  createExamEvent(exam) {
    this.examService.createExam(exam)
      .subscribe(() => {
        this.creatingExam = false;
        this.error = null;
      },
      err => {
        this.error = err.message;
      });
  }

}
